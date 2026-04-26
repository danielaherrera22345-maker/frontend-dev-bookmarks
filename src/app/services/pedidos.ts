import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id: number;
  cliente_id: number;
  productos_ids: number[];
  total: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = 'http://127.0.0.1:8000/pedidos';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  agregar(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}