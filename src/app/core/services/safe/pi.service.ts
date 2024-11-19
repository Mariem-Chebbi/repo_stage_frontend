import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pi } from '../../models/safe/pi.model';

@Injectable({
  providedIn: 'root'
})
export class PiService {
  private apiUrl = 'http://localhost:8087/ManajeroBackend/program-increments';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all Program Increments
  getAllProgramIncrements(): Observable<Pi[]> {
    return this.http.get<Pi[]>(this.apiUrl);
  }

  // Get a single Program Increment by ID
  getProgramIncrementById(id: string): Observable<Pi> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Pi>(url);
  }

  // Create a new Program Increment
  createProgramIncrement(pi: Pi): Observable<Pi> {
    return this.http.post<Pi>(this.apiUrl, pi, this.httpOptions);
  }

  // Update an existing Program Increment
  updateProgramIncrement(pi: Pi): Observable<Pi> {
    const url = `${this.apiUrl}/${pi.id}`;
    return this.http.put<Pi>(url, pi, this.httpOptions);
  }

  // Delete a Program Increment by ID
  deleteProgramIncrement(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
