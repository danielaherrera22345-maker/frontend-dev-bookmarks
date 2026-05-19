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

  constructor(
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.pedidosService.obtener().subscribe({

      next: (data) => {
        this.pedidos = data;
      },

      error: (err) => {
        console.log(err);
        alert('Error al cargar pedidos');
      }

    });

  }

agregar() {
  const productosIds = this.productosTexto
    .split(',')
    .map(id => Number(id.trim()))
    .filter(id => !isNaN(id) && id > 0);

  const pedidoEnviar: Pedido = {
    id: 0,
    cliente_id: Number(this.nuevo.cliente_id),
    productos_ids: productosIds,
    total: Number(this.nuevo.total),
    estado: this.nuevo.estado
  };

  this.pedidosService.agregar(pedidoEnviar).subscribe({
    next: () => {
      alert('Pedido agregado correctamente');

      this.nuevo = {
        id: 0,
        cliente_id: 0,
        productos_ids: [],
        total: 0,
        estado: ''
      };

      this.productosTexto = '';
      this.cargar();
    },
    error: (err) => {
      console.log(err);
      alert('Error al agregar pedido');
    }
  });
}

  eliminar(id: number) {

    this.pedidosService.eliminar(id).subscribe({

      next: () => {

        alert('Pedido eliminado');

        this.cargar();

      },

      error: (err) => {

        console.log(err);

        alert('Error al eliminar pedido');

      }

    });

  }

}