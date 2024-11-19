import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pipeline } from '../../models/Cig2_models/pipeline.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private baseUrl = 'http://localhost:8093/api/pipelines'; // Corriger le chemin

  constructor(private http: HttpClient) { }

  getAllPipelines(): Observable<Pipeline[]> {
    return this.http.get<Pipeline[]>(`${this.baseUrl}/getAll`);
  }

  getPipelineById(id: string): Observable<Pipeline> {
    return this.http.get<Pipeline>(`${this.baseUrl}/${id}`);
  }

  createPipeline(pipeline: Pipeline, stageIds: string[] = []): Observable<Pipeline> {
    // If stageIds is not provided, default to an empty array
    return this.http.post<Pipeline>(`${this.baseUrl}?stageIds=${stageIds.join(',')}`, pipeline);
  }

  updatePipeline(id: string, pipeline: Pipeline): Observable<Pipeline> {
    return this.http.put<Pipeline>(`${this.baseUrl}/${id}`, pipeline);
  }

  deletePipeline(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addStagesToPipeline(id: string, stageIds: string[]): Observable<Pipeline> {
    return this.http.post<Pipeline>(`${this.baseUrl}/${id}/stages`, stageIds);
  }
}
