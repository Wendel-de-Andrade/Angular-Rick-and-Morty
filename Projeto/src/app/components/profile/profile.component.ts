import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  editedName!: string;
  editedEmail!: string;
  imagePreview!: string | ArrayBuffer | null;

  constructor(private authService: AuthService, private location: Location) {
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.authService.getUser(); // Carregar dados do usuário atual
    this.editedName = this.user.name;
    this.editedEmail = this.user.email;
    this.imagePreview = this.user.image;
  }
}
