import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://api-techstore.onrender.com/productos';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  obtener(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, this.headers());
  }

  agregar(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto, this.headers());
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.headers());
  }
}