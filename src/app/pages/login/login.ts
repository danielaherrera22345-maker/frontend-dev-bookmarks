import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar() {
    this.authService.login(this.username, this.password).subscribe({
      next: (ok) => {
        if (ok) {
          this.mensaje = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.mensaje = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.mensaje = 'Error al iniciar sesión';
      }
    });
  }
}