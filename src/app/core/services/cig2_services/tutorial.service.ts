import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../../models/Cig2_models/tutorial.model';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/tutorials'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  get(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.apiUrl}/${id}`);
  }
    getById(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.apiUrl}/${id}`);
  }

  create(tutorial: Tutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(`${this.apiUrl}/addTuto`, tutorial);
  }
update(id: string, tutorial: Tutorial): Observable<Tutorial> {
  return this.http.put<Tutorial>(`${this.apiUrl}/modify/${id}`, tutorial);
}


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
