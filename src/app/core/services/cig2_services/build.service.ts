import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  private apiUrl = 'http://localhost:8093/api/builds';

  constructor(private http: HttpClient) { }

  triggerBuild(build: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/trigger`, build);
  }

  updateBuildStatus(build: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-status`, build);
  }
  
}
