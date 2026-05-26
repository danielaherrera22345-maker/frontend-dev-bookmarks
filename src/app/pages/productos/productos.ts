import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductosService, Producto } from '../../services/productos';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  nuevo: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  error = '';
  mensaje = '';
  cargando = false;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.productosService.obtener().subscribe({
      next: (data) => this.productos = data,
      error: () => {
        this.error = 'Error al cargar productos.';
      }
    });
  }

  agregar() {

    this.error = '';
    this.mensaje = '';

    if (!this.nuevo.nombre.trim()) {
      this.error = 'Ingrese el nombre del producto.';
      return;
    }

    if (!this.nuevo.descripcion.trim()) {
      this.error = 'Ingrese la descripción.';
      return;
    }

    if (this.nuevo.precio <= 0) {
      this.error = 'El precio debe ser mayor a 0.';
      return;
    }

    if (this.nuevo.stock < 0) {
      this.error = 'El stock no puede ser negativo.';
      return;
    }

    this.cargando = true;

    this.productosService.agregar(this.nuevo).subscribe({

      next: () => {

        this.cargando = false;

        this.mensaje = 'Producto agregado correctamente.';

        this.nuevo = {
          id: 0,
          nombre: '',
          descripcion: '',
          precio: 0,
          stock: 0
        };

        this.cargar();
      },

      error: (err) => {

        this.cargando = false;

        if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor.';
        }
        else if (err.status === 400) {
          this.error = 'Datos inválidos.';
        }
        else {
          this.error = 'Error al agregar producto.';
        }
      }
    });
  }

  eliminar(id: number) {

    this.error = '';
    this.mensaje = '';

    this.productosService.eliminar(id).subscribe({

      next: () => {
        this.mensaje = 'Producto eliminado correctamente.';
        this.cargar();
      },

      error: () => {
        this.error = 'Error al eliminar producto.';
      }

    });
  }
}