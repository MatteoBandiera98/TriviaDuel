import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) { }

  // Metodo per ottenere tutte le categorie disponibili
  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  // Metodo per ottenere una domanda casuale in base alla categoria
  getQuestionByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/random?category=${category}`);
  }
}
