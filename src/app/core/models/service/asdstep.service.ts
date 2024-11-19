
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ASDStep } from '../ASDStep';

@Injectable({
  providedIn: 'root'
})
export class ASDStepService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/asd-steps';

  constructor(private http: HttpClient) {}

  getASDSteps(): Observable<ASDStep[]> {
    return this.http.get<ASDStep[]>(this.apiUrl);
  }

  createASDStep(step: ASDStep): Observable<ASDStep> {
    return this.http.post<ASDStep>(this.apiUrl, step);
  }

  updateASDStep(id: string, step: ASDStep): Observable<ASDStep> {
    return this.http.put<ASDStep>(`${this.apiUrl}/${id}`, step);
  }

  deleteASDStep(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

