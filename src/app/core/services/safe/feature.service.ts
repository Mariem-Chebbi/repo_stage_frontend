import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from '../../models/safe/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  private apiUrl = 'http://localhost:8087/ManajeroBackend/feature'; // Adjust the endpoint as necessary

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }


  // Get all Features
  getAllFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(this.apiUrl);
  }

  // Get a single Feature by ID
  getFeatureById(id: string): Observable<Feature> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Feature>(url);
  }

  // Create a new Feature
  createFeature(feature: Feature): Observable<Feature> {
    return this.http.post<Feature>(this.apiUrl, feature, this.httpOptions);
  }

  // Update an existing Feature
  updateFeature(feature: Feature): Observable<Feature> {
    const url = `${this.apiUrl}/${feature.id}`;
    return this.http.put<Feature>(url, feature, this.httpOptions);
  }

  // Delete a Feature by ID
  deleteFeature(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getfeaturescount(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/count`);
  }

 
}
