import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EpisodeService } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FilterService } from '../../services/filter.service';
import { Episode } from '../../models/episode-model';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, CardComponent, ModalComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  private filterService = inject(FilterService);
  episodes: any[] = [];
  currentPage = 1;
  isLoading = false;
  totalEpisodes = 1;
  totalPages = 0;
  selectedEpisode: any;
  isModalOpen = false;
  currentFilter: string = '';

  ngOnInit(): void {
    this.filterService.filter$.subscribe(filter => {
      this.currentFilter = filter;
      this.episodes = [];
      this.loadEpisodes(1);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const threshold = 150; // Distância do final da pagina para carregar mais personagens
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;

    if (position + threshold >= height) {
      this.loadMore();
    }
  }

  loadEpisodes(page: number, filter: string = this.currentFilter): void {
    this.isLoading = true;
    this.episodeService.getEpisodes(page).subscribe({
      next: (res: any) => {
        const filteredResults = this.filterService.filterData(res.results, this.currentFilter);
        this.episodes = this.episodes.concat(filteredResults);
        this.totalEpisodes = res.info.count;
        this.totalPages = res.info.pages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar os episódios:', error);
        this.isLoading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.isLoading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEpisodes(this.currentPage);
    }
  }

  openModal(episode: any): void {
    this.selectedEpisode = episode;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


  trackById(index: number, episode: any): number {
    return episode.id;
  }
}
