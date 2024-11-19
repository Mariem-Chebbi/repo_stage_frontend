import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../Summary';
@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/summaries';


  constructor(private http: HttpClient) {}

  getSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(this.apiUrl);
  }

  addSummary(summary: Summary): Observable<Summary> {
    return this.http.post<Summary>(this.apiUrl, summary);
  }

  updateSummary(id: string, summary: Summary): Observable<Summary> {
    return this.http.put<Summary>(`${this.apiUrl}/${id}`, summary);
  }

  deleteSummary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
