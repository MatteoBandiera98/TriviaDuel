import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
  id: number;
  username: string;
  email: string;
  // altri campi necessari
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth'; // Assicurati che l'URL sia corretto per il tuo backend
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Memorizza il token JWT nel localStorage
        this.userSubject.next(response.user); // Emetti l'utente loggato
      }),
      catchError(this.handleError) // Gestione degli errori
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null); // Pulisci l'utente al logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError) // Gestione degli errori
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Puoi personalizzare ulteriormente la gestione degli errori qui
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Errore lato client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Errore lato server
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
