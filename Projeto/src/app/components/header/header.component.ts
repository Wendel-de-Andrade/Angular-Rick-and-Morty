import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showSearch = false;
  searchTerm = '';
  showUserMenu = false;
  user: any = null;

  constructor(
    private filterService: FilterService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSearch = event.url !== '/';
        this.checkUser();
      }
    });


    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.elementRef.nativeElement.contains(event.target) && this.showUserMenu) {
        this.showUserMenu = false;
      }
    });
  }

  updateFilter() {
    this.filterService.setFilter(this.searchTerm);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  checkUser() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.checkUser();
    this.router.navigate(['/']);
  }
}
