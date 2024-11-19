import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stage } from '../../models/Cig2_models/stage.model';


@Injectable({
  providedIn: 'root'
})
export class StageService {
    private baseUrl = 'http://localhost:8093/api/stages'; // Corriger le chemin de base

    constructor(private http: HttpClient) { }
  
    getAllStages(): Observable<Stage[]> {
      return this.http.get<Stage[]>(`${this.baseUrl}/getall`); // Ajouter le chemin pour obtenir tous les stages
    }
  
    getStageById(id: string): Observable<Stage> {
      return this.http.get<Stage>(`${this.baseUrl}/getstagebyid/${id}`); // Ajouter le chemin pour obtenir un stage par ID
    }
  
    createStage(stage: Stage): Observable<Stage> {
      return this.http.post<Stage>(`${this.baseUrl}/add`, stage); // Ajouter le chemin pour créer un stage
    }
  
    updateStage(id: string, stage: Stage): Observable<Stage> {
      return this.http.put<Stage>(`${this.baseUrl}/modify/${id}`, stage); // Ajouter le chemin pour mettre à jour un stage
    }
  
    deleteStage(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/delete/${id}`); // Ajouter le chemin pour supprimer un stage
    }

    getStagesByPipelineId(pipelineId: string): Observable<Stage[]> {
      return this.http.get<Stage[]>(`${this.baseUrl}/GETstagesByPipelineId/${pipelineId}`); // Ajouter le chemin pour obtenir les stages par pipelineId
    }

}
