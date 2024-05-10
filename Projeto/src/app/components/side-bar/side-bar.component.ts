import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  items: {title: string; link: string} [] = [
    {title: 'Episódios', link: 'episodios'},
    {title: 'Personagens', link: 'personagens'},
  ]
}
