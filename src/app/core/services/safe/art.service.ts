import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Art } from '../../models/safe/art.model';

@Injectable({
  providedIn: 'root'
})
export class ArtService {
  private apiUrl = 'http://localhost:8087/ManajeroBackend/art'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getAllArts(): Observable<Art[]> {
    return this.http.get<Art[]>(this.apiUrl);
  }
}
