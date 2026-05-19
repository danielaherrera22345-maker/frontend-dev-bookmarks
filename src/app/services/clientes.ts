import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'https://api-techstore.onrender.com';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  agregar(cliente: Cliente): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}