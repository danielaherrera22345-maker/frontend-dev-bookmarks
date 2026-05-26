import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClientesService, Cliente } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  cargando = false;
  mensaje = '';
  error = '';

  nuevo: Cliente = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  constructor(
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.clientesService.obtener().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: () => {
        this.error = 'Error al cargar clientes';
      }
    });
  }

  agregar() {

    this.error = '';
    this.mensaje = '';

    if (!this.nuevo.nombre.trim()) {
      this.error = 'Ingrese el nombre.';
      return;
    }

    if (!this.nuevo.correo.trim()) {
      this.error = 'Ingrese el correo.';
      return;
    }

    if (!this.nuevo.telefono.trim()) {
      this.error = 'Ingrese el teléfono.';
      return;
    }

    if (!this.nuevo.direccion.trim()) {
      this.error = 'Ingrese la dirección.';
      return;
    }

    this.cargando = true;

    this.clientesService.agregar(this.nuevo).subscribe({

      next: () => {

        this.mensaje = 'Cliente agregado correctamente';

        this.nuevo = {
          id: 0,
          nombre: '',
          correo: '',
          telefono: '',
          direccion: ''
        };

        this.cargando = false;

        this.cargar();
      },

      error: () => {

        this.error = 'Error al agregar cliente';
        this.cargando = false;

      }
    });
  }

  eliminar(id:number){

    this.clientesService.eliminar(id).subscribe({

      next:()=>{

        this.mensaje='Cliente eliminado correctamente';
        this.cargar();

      },

      error:()=>{

        this.error='Error al eliminar cliente';

      }

    });

  }

}