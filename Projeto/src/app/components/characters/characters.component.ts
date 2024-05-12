import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';
import { FilterService } from '../../services/filter.service';
import { Character } from '../../models/character-model';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent, ModalComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  private characterService = inject(CharacterService);
  private filterService = inject(FilterService);
  characters: any[] = [];
  currentPage = 1;
  isLoading = false;
  totalCharacters = 1;
  totalPages = 0;
  selectedCharacter: any;
  isModalOpen = false;
  currentFilter: string = '';

  ngOnInit(): void {
    this.filterService.filter$.subscribe(filter => {
      this.currentFilter = filter;
      this.characters = [];
      this.loadCharacters(1);
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

  loadCharacters(page: number): void {
    this.isLoading = true;
    this.characterService.getCharacters(page).subscribe({
      next: (res: any) => {
        const filteredResults = this.filterService.filterData(res.results, this.currentFilter);
        this.characters = this.characters.concat(filteredResults);
        this.totalCharacters = res.info.count;
        this.totalPages = res.info.pages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar os personagens:', error);
        this.isLoading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.isLoading && this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.currentPage);
    }
  }

  openModal(episode: any): void {
    this.selectedCharacter = episode;
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

  trackById(index: number, character: any): number {
    return character.id;
  }

}
