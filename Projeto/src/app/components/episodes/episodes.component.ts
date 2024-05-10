import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { EpisodeService } from '../../services/episode.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, CardComponent, ModalComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  private episodeService = inject(EpisodeService);
  episodes: any[] = [];
  currentPage = 1;
  isLoading = false;
  totalEpisodes = 1;
  selectedEpisode: any;
  isModalOpen = false;

  ngOnInit(): void {
    this.loadEpisodes(this.currentPage);
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

  loadEpisodes(page: number): void {
    if (this.episodes.length >= this.totalEpisodes) {
      return;
    }

    this.isLoading = true;
    this.episodeService.getEpisodes(page).subscribe({
      next: (res: any) => {
        this.episodes = this.episodes.concat(res.results);
        this.totalEpisodes = res.info.count;
        this.isLoading = false;
        console.log('Episódios carregados:', res.results);
      },
      error: (error) => {
        console.log('Erro no fecth dos episódios:', error);
        this.isLoading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.isLoading) {
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
