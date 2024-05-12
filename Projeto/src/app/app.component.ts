import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MainComponent } from './components/main/main.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, MainComponent, EpisodesComponent, ProfileComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Projeto';
  showLayout = true;
  isProfileActive = false; // Nova propriedade para controle do estilo

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !['/login'].includes(event.url);
        this.isProfileActive = event.url === '/perfil'; // Ajuste para a URL de perfil
      }
    });
  }

}
