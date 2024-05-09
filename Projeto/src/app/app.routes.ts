import { Routes } from '@angular/router';
import { EpisodesComponent } from './componentes/episodes/episodes.component';
import { CharactersComponent } from './componentes/characters/characters.component';
import { MainComponent } from './componentes/main/main.component';

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
