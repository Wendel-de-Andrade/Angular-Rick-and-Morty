import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'https://rickandmortyapi.com/api/character'
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient)

  constructor() { }
  getCharacters() {
    return this.http.get(base_url);
  }
}

