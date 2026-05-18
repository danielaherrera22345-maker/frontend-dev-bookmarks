import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {
    this.authService.login(this.username, this.password).subscribe({
      next: (ok) => {
        if (ok) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}