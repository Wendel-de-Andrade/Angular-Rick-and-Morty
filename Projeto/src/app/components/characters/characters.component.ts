import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, CardComponent, ModalComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  private characterService = inject(CharacterService);
  characters: any[] = [];
  currentPage = 1;
  isLoading = false;
  totalCharacters = 1;
  selectedCharacter: any;
  isModalOpen = false;

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
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
    if (this.characters.length >= this.totalCharacters) {
      return;
    }

    this.isLoading = true;
    this.characterService.getCharacters(page).subscribe({
      next: (res: any) => {
        this.characters = this.characters.concat(res.results);
        this.totalCharacters = res.info.count;
        this.isLoading = false;
        console.log('Personagens carregados:', res.results);
      },
      error: (error) => {
        console.log('Erro no fecth dos personagens:', error);
        this.isLoading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.isLoading) {
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
