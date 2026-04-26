import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(
      `${this.apiUrl}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      {}
    ).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      }),
      map(response => !!response.access_token)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}