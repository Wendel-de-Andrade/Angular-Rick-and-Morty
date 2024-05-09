import { Component, OnInit, inject } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  private characterService = inject(CharacterService);
  characters: any = [];

  ngOnInit(): void {
    this.laodCharacters();
  }
  laodCharacters() {
    this.characterService.getCharacters().subscribe({
      next: (res : any) => {
        this.characters = res.results;
        console.log(res.results);
      },
      error:(error) => console.log('Erro no fecth de Personagens: ', error)
    });
  }
}
