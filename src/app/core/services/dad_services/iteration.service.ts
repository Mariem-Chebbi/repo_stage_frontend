import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/iterations';

  constructor(private http: HttpClient) { }

  public add(iteration: any, projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, iteration, {
      params: { idProject: projectId }
    });
  }

  public getAll(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getAll/${id}`);
  }

  public edit(obj): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/edit`, obj);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
  }

  public getById(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${id}`);
  }

  public startIteration(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/start/${id}`, null);
  }

  public finishIteration(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/finish/${id}`, null);
  }

  public checkStatus(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/checkStatus/${id}`);
  }
  
}
