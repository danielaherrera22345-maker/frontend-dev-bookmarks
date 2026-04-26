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

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.productosService.obtener().subscribe({
      next: (data) => this.productos = data,
      error: () => alert('Error al cargar productos')
    });
  }

  agregar() {
    this.productosService.agregar(this.nuevo).subscribe({
      next: () => {
        this.nuevo = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0 };
        this.cargar();
      },
      error: () => alert('Error al agregar producto')
    });
  }

  eliminar(index: number) {
    this.productosService.eliminar(index).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar producto')
    });
  }
}