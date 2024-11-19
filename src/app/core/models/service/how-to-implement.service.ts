import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HowToImplement } from '../HowToImplement';


@Injectable({
  providedIn: 'root'
})
export class HowToImplementService {

  
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/how-to-implement';

  constructor(private http: HttpClient) {}

  getHowToImplements(): Observable<HowToImplement[]> {
    return this.http.get<HowToImplement[]>(this.apiUrl);
  }

  addHowToImplement(howToImplement: HowToImplement): Observable<HowToImplement> {
    return this.http.post<HowToImplement>(this.apiUrl, howToImplement);
  }

  updateHowToImplement(id: string, howToImplement: HowToImplement): Observable<HowToImplement> {
    return this.http.put<HowToImplement>(`${this.apiUrl}/${id}`, howToImplement);
  }

  deleteHowToImplement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
