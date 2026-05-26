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
  productosTexto = '';

  nuevo: Pedido = {
    id: 0,
    cliente_id: 0,
    productos_ids: [],
    total: 0,
    estado: ''
  };

  error = '';
  mensaje = '';
  cargando = false;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.pedidosService.obtener().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: () => {
        this.error = 'Error al cargar pedidos.';
      }
    });
  }

  agregar() {
    this.error = '';
    this.mensaje = '';

    const productosIds = this.productosTexto
      .split(',')
      .map(id => Number(id.trim()))
      .filter(id => !isNaN(id) && id > 0);

    if (this.nuevo.cliente_id <= 0) {
      this.error = 'Ingrese un ID de cliente válido.';
      return;
    }

    if (productosIds.length === 0) {
      this.error = 'Ingrese al menos un ID de producto.';
      return;
    }

    if (this.nuevo.total <= 0) {
      this.error = 'El total debe ser mayor a 0.';
      return;
    }

    if (!this.nuevo.estado.trim()) {
      this.error = 'Ingrese el estado del pedido.';
      return;
    }

    const pedidoEnviar: Pedido = {
      id: 0,
      cliente_id: Number(this.nuevo.cliente_id),
      productos_ids: productosIds,
      total: Number(this.nuevo.total),
      estado: this.nuevo.estado.trim()
    };

    this.cargando = true;

    this.pedidosService.agregar(pedidoEnviar).subscribe({
      next: () => {
        this.cargando = false;
        this.mensaje = 'Pedido agregado correctamente.';

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
        this.cargando = false;

        if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor.';
        } else if (err.status === 400 || err.status === 422) {
          this.error = 'Datos inválidos. Revise los campos del pedido.';
        } else {
          this.error = 'Error al agregar pedido.';
        }
      }
    });
  }

  eliminar(id: number) {
    this.error = '';
    this.mensaje = '';

    this.pedidosService.eliminar(id).subscribe({
      next: () => {
        this.mensaje = 'Pedido eliminado correctamente.';
        this.cargar();
      },
      error: () => {
        this.error = 'Error al eliminar pedido.';
      }
    });
  }
}