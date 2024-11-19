import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Introduction } from '../Introduction';

@Injectable({
  providedIn: 'root'
})
export class IntroductionService {

  
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/introductions';

  constructor(private http: HttpClient) { }

  getIntroductions(): Observable<Introduction[]> {
    return this.http.get<Introduction[]>(this.apiUrl);
  }

  getIntroduction(id: string): Observable<Introduction> {
    return this.http.get<Introduction>(`${this.apiUrl}/${id}`);
  }

  addIntroduction(introduction: Introduction): Observable<Introduction> {
    return this.http.post<Introduction>(this.apiUrl, introduction);
  }

  deleteIntroduction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateIntroduction(id: string, introduction: Introduction): Observable<Introduction> {
    return this.http.put<Introduction>(`${this.apiUrl}/${id}`, introduction);
  }
}
