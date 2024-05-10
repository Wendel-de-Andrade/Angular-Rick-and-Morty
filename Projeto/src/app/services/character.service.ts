import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

const base_url = 'https://rickandmortyapi.com/api/character'
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient)

  constructor() { }
  getCharacters(page: number = 1) {
    return this.http.get(`${base_url}?page=${page}`)
      // .pipe(
      //   delay(100000)
      // )
      ;
  }
}

