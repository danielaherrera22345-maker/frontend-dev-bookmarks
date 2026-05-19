import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'https://api-techstore.onrender.com';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregar(producto: Producto): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}