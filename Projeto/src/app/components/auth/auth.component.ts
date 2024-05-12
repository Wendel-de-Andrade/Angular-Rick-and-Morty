import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  showLogin = true; // Controle de exibição dos formulários
  loginEmail = '';
  loginPassword = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  userImage?: File;

  constructor(private authService: AuthService, private router: Router) { }

  goHome() {
    this.router.navigate(['']);
  }

  onLogin() {
    const success = this.authService.login(this.loginEmail, this.loginPassword);
    if (success) {
      console.log('Login bem-sucedido');
      this.router.navigate(['']).then(() => {
        window.location.reload(); // Como último recurso, se necessário
      });
    } else {
      console.log('Falha no login');
    }
  }

  async onRegister() {
    if (this.userImage) {
      await this.authService.register(
        this.registerName,
        this.registerEmail,
        this.registerPassword,
        this.userImage
      );
      console.log('Registro bem-sucedido');
      this.showLogin = true;
    } else {
      console.log('Nenhuma imagem fornecida');
    }
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File;
    if (element.files && element.files.length) {
      file = element.files[0];
      this.userImage = file;
      // Aqui você pode adicionar uma lógica para cortar a imagem
    }
  }
}
