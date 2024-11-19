import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/';

  constructor(private http: HttpClient) { }

  public add(tutorial: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, tutorial);
  }

  public getusers(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}collaborations/getAll/${id}`,);
  }

  public assignUserToTeam(email: string, projectId: string, role: string): Observable<any> {
    return this.http.put<any>(`${this.apiurl}collaborations/assign/${email}/${projectId}/${role}`, null);
  }

  public delete(id): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}collaborations/delete/${id}`,);
  }

  public getById(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}users/get/${id}`);
  }

  public archive(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}users/archive/${id}`, null);
  }

  public restore(id): Observable<any> {
    return this.http.put<any>(`${this.apiurl}users/restore/${id}`, null);
  }
}
