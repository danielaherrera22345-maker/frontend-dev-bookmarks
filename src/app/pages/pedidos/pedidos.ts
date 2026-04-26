import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PedidosService, Pedido } from '../../services/pedidos';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  productosTexto: string = '';

  nuevo: Pedido = {
    id: 0,
    cliente_id: 0,
    productos_ids: [],
    total: 0,
    estado: ''
  };

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.pedidosService.obtener().subscribe({
      next: (data) => this.pedidos = data,
      error: () => alert('Error al cargar pedidos')
    });
  }

  agregar() {
    this.nuevo.productos_ids = this.productosTexto
      .split(',')
      .map(id => Number(id.trim()))
      .filter(id => !isNaN(id));

    this.pedidosService.agregar(this.nuevo).subscribe({
      next: () => {
        this.nuevo = { id: 0, cliente_id: 0, productos_ids: [], total: 0, estado: '' };
        this.productosTexto = '';
        this.cargar();
      },
      error: () => alert('Error al agregar pedido')
    });
  }

  eliminar(index: number) {
    this.pedidosService.eliminar(index).subscribe({
      next: () => this.cargar(),
      error: () => alert('Error al eliminar pedido')
    });
  }
}