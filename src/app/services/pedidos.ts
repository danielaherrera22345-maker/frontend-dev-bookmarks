import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private apiUrl = 'https://api-techstore.onrender.com/pedidos';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  obtener(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  agregar(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido, {
      headers: this.getHeaders()
    });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}