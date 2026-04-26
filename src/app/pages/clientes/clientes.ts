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

  nuevo: Cliente = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.clientesService.obtener().subscribe({
      next: (data) => this.clientes = data,
      error: () => alert('Error al cargar clientes')
    });
  }

  agregar() {
    this.clientesService.agregar(this.nuevo).subscribe({
      next: () => {
        this.nuevo = { id: 0, nombre: '', correo: '', telefono: '', direccion: '' };
        this.cargar();
      },
      error: () => alert('Error al agregar cliente')
    });
  }

  eliminar(id: number) {
  this.clientesService.eliminar(id).subscribe({
    next: () => this.cargar(),
    error: () => alert('Error al eliminar cliente')
  });
}
}