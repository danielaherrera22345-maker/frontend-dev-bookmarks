import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

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

  mensaje = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ingresar(): void {

    this.mensaje = '';

    if (!this.username.trim()) {
      this.mensaje = 'Ingrese el usuario';
      return;
    }

    if (!this.password.trim()) {
      this.mensaje = 'Ingrese la contraseña';
      return;
    }

    this.cargando = true;

    this.authService.login(this.username, this.password).subscribe({

      next: (ok) => {

        this.cargando = false;

        if (ok) {
          this.router.navigate(['/dashboard']);
        } else {
          this.mensaje = 'Usuario o contraseña incorrectos';
        }

      },

      error: (error) => {

        this.cargando = false;

        console.error(error);

        this.mensaje =
          'No se pudo conectar con el servidor o las credenciales son incorrectas';

      }

    });

  }

}