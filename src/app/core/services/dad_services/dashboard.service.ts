import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiurl = 'http://localhost:8085/ManajeroBackend/dad/dashboard';

  constructor(private http: HttpClient) { }

  public get(id): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/statistics/${id}`);
}

}
