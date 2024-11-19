import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from '../../models/safe/sprint.model';
@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'http://localhost:8087/ManajeroBackend/sprints';
  constructor(private http: HttpClient) { }

 

  // Create a new Sprint
  createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.apiUrl, sprint);
  }

  // Get a Sprint by ID
  getSprintById(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.apiUrl}/${id}`);
  }

  // Get all Sprints
  getAllSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.apiUrl);
  }

  // Update an existing Sprint
  updateSprint(id: string, sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/${id}`, sprint);
  }

  // Delete a Sprint by ID
  deleteSprint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // getSprintStats(): Observable<Record<string, number>> {
  //   return this.http.get<Record<string, number>>(`${this.apiUrl}/stats`);
  // }
  getSprintStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/stats`);
  }
  
  
}
