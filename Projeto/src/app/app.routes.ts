import { Routes } from '@angular/router';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { CharactersComponent } from './components/characters/characters.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'episodios',
    component: EpisodesComponent
  },
  {
    path: 'personagens',
    component: CharactersComponent
  },
];
