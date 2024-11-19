import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExhaustiveTutorial } from '../ExhaustiveTutorial';



@Injectable({
  providedIn: 'root'
})
export class ExhaustiveTutorialService {

  
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/exhaustive-tutorials';

  constructor(private http: HttpClient) { }

  getExhaustiveTutorials(): Observable<ExhaustiveTutorial[]> {
    return this.http.get<ExhaustiveTutorial[]>(this.apiUrl);
  }

  getExhaustiveTutorial(id: string): Observable<ExhaustiveTutorial> {
    return this.http.get<ExhaustiveTutorial>(`${this.apiUrl}/${id}`);
  }

  addExhaustiveTutorial(exhaustiveTutorial: ExhaustiveTutorial): Observable<ExhaustiveTutorial> {
    return this.http.post<ExhaustiveTutorial>(this.apiUrl, exhaustiveTutorial);
  }

  deleteExhaustiveTutorial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateExhaustiveTutorial(id: string, introduction: ExhaustiveTutorial): Observable<ExhaustiveTutorial> {
    return this.http.put<ExhaustiveTutorial>(`${this.apiUrl}/${id}`, introduction);
  }
  
}
