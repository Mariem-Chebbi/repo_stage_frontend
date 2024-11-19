import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/releases';

  constructor(private http: HttpClient) { }

  public add(release: any, projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, release, {
      params: { idProject: projectId }
    });
  }

  public getAll(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/getAll/${id}`);
  }

  public getById(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${id}`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
  }

  public edit(release): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/edit`, release);
  }

  getReleasePredictability(projectId: string): Observable<number> {
    return this.http.get<number>(`${this.apiurl}/predictability/${projectId}`);
  }

  public archive(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/archive/${id}`,null);
  }

  public restore(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/restore/${id}`,null);
  }
}
