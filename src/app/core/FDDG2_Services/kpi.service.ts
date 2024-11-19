import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  constructor(private http: HttpClient) {}
 private baseUrl = 'http://localhost:8085/ManajeroBackend/kpis'
  getFeatureCompletionRate(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}`+`/completion-rate`);
  }
}
