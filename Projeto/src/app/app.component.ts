import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { SideBarComponent } from './componentes/side-bar/side-bar.component';
import { MainComponent } from './componentes/main/main.component';
import { EpisodesComponent } from './componentes/episodes/episodes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, MainComponent, EpisodesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Projeto';
}
