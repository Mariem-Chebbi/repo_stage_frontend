import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentation } from '../../models/LSS_models/Documentation';
import { ImageDocum } from '../../models/LSS_models/ImageDocum';

@Injectable({
  providedIn: 'root'
})
export class DocumentationServiceService {

  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/documentation';
  private apiproject='http://localhost:8085/ManajeroBackend/api/projectcharter/allProjects';
  constructor(private http: HttpClient) {}

  updateDocumentation(id: string, updatedDoc: Documentation): Observable<Documentation> {
    return this.http.put<Documentation>(`${this.apiUrl}/${id}`, updatedDoc);
  }
   addImageToDocumentation(docId: string, image: ImageDocum): Observable<ImageDocum> {
    return this.http.post<ImageDocum>(`${this.apiUrl}/${docId}/images`, image);
  }
  deleteImage(docId: string, imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${imageId}/${docId}`);
  }
  getImagesByDocumentationId(docId: string): Observable<ImageDocum[]> {
    return this.http.get<ImageDocum[]>(`${this.apiUrl}/${docId}/images`);
  }
  getDocumentationWithImages(section: string): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/why`);
  }
  getDocumentationWithImageswhat(section: string): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/what`);
  }
  getDocumentationWithImageshow(section: string): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/how`);
  }
  getDocumentationWithImageswhatif(section: string): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/whatif`);
  }
  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiproject}`);
  }
}
