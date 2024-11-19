import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/projects';

  constructor(private http: HttpClient) { }

  public add(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, project);
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getAll`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
  }

}
