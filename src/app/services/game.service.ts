import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080/api'; // Assumi che l'API del backend sia su localhost sulla porta 8080

  constructor(private http: HttpClient) { }

  updatePlayerScore(playerId: number, newScore: number): Observable<any> {
    const url = `${this.apiUrl}/players/${playerId}/score`;
    const body = { score: newScore }; // Assicurati che il corpo sia nel formato corretto
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, body, { headers });
  }
}
