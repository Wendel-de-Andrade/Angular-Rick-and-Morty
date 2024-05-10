import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'https://rickandmortyapi.com/api/episode'

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private http = inject(HttpClient)

  constructor() { }
  getEpisodes(page: number = 1) {
    return this.http.get(`${base_url}?page=${page}`);
  }
}
