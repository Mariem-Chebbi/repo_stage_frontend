import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/objectives';

  constructor(private http: HttpClient) { }

  public add(objective: any, projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, objective, {
      params: { idProject: projectId }
    });
  }

  public getAll(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getAll/${id}`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
  }

  public edit(objective): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/edit`, objective);
  }

  public archive(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/archive/${id}`, null);
  }

  public restore(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/restore/${id}`, null);
  }

  public getById(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${id}`);
  }
}
