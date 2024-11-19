import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/teams';

  constructor(private http: HttpClient) { }

  public get(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${id}`,);
  }

  public add(team: any, projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/add`, team, {
      params: { idProject: projectId }
    });
  }
}
