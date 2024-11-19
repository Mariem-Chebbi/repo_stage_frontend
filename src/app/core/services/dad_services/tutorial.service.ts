import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/tutorials';

  constructor(private http: HttpClient) { }

  public add(tutorial: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, tutorial);
  }

  public gettutorial(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getAll`,);
  }

  public deletetutorial(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
  }

  public edit(tutorial: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/edit`, tutorial);
  }

  public archive(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/archive/${id}`,null);
  }

  public restore(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/restore/${id}`,null);
  }
}
