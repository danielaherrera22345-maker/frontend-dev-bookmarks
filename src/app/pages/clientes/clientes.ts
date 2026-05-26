import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent {

  clientes:any[] = [];

  nuevoCliente = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  error = '';
  cargando = false;
  mensaje = '';

  constructor(private clientesService: ClientesService){}

  agregarCliente() {

    this.error = '';
    this.mensaje = '';

    if(!this.nuevoCliente.nombre.trim()){
      this.error = 'Ingrese el nombre.';
      return;
    }

    if(!this.nuevoCliente.correo.trim()){
      this.error = 'Ingrese el correo.';
      return;
    }

    if(!this.nuevoCliente.telefono.trim()){
      this.error = 'Ingrese el teléfono.';
      return;
    }

    if(!this.nuevoCliente.direccion.trim()){
      this.error = 'Ingrese la dirección.';
      return;
    }

    this.cargando = true;

    this.clientesService.agregar(this.nuevoCliente).subscribe({

      next: () => {

        this.cargando = false;

        this.mensaje = 'Cliente agregado correctamente.';

        this.nuevoCliente = {
          id:0,
          nombre:'',
          correo:'',
          telefono:'',
          direccion:''
        };

      },

      error: (err) => {

        this.cargando = false;

        if(err.status === 0){
          this.error = 'No se pudo conectar con el servidor.';
        }
        else if(err.status === 400){
          this.error = 'Datos inválidos.';
        }
        else{
          this.error = 'Error al agregar cliente.';
        }
      }
    });
  }
}