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
    this.characterService.getCharacters().subscribe((characters: any) => {
      console.log(characters);
      this.characters = characters;
    });
  }
}
