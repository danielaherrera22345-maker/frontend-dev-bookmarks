import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl = 'https://api-techstore.onrender.com/clientes';

  constructor(private http: HttpClient) {}

  private headers() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  obtener(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, this.headers());
  }

  agregar(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente, this.headers());
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.headers());
  }
}