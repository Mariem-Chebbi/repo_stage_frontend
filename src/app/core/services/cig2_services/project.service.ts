// src/app/services/project.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { Project } from '../../models/Cig2_models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/projects'; // URL de base pour les API
  private sonarApiUrl = 'https://sonarcloud.io/api/measures/component';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Obtenir tous les projets
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/all`);
  }

  // Obtenir un projet par ID
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/getprojectbyid/${id}`);
  }

  // Créer un nouveau projet
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/add`, project, this.httpOptions);
  }

  // Mettre à jour un projet existant
  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/modify/${id}`, project, this.httpOptions);
  }

  // Supprimer un projet
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getAllWorkflowRuns(project: Project): Observable<any> {
    const url = `https://api.github.com/repos/${project.gitUsername}/${project.gitRepo}/actions/runs`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${project.token}`,
      'Accept': 'application/vnd.github.v3+json'
    });
  
    return this.http.get<any>(url, { headers: headers });
  }
  

  deleteWorkflowRun(project: Project, buildId: number): Observable<any> {
    const url = `https://api.github.com/repos/${project.gitUsername}/${project.gitRepo}/actions/runs/${buildId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${project.token}`,
      'Accept': 'application/vnd.github.v3+json'
    });

    return this.http.delete<any>(url, { headers: headers });
  }
  
  getSonarMetrics(projectKey: string): Observable<any> {
    const metricKeys = 'bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density';
    const url = `${this.sonarApiUrl}?component=${projectKey}&metricKeys=${metricKeys}`;
    return this.http.get(url);
  }

  getSonarAnalysisDate(projectKey: string): Observable<any> {
    const url = `https://sonarcloud.io/api/project_analyses/search?project=${projectKey}&ps=1`;
    return this.http.get(url);
  }

  // Récupérer l'historique des analyses
  getAnalysisHistory(projectKey: string): Observable<any> {
    return this.http.get(`https://sonarcloud.io/api/project_analyses/search?project=${projectKey}&ps=100`);
  }

getAdditionalStatistics(projectKey: string): Observable<any> {
  const url = `https://sonarcloud.io/api/measures/component?component=${projectKey}&metricKeys=bugs,code_smells,coverage,vulnerabilities,new_issues,total_issues`;
  return this.http.get<any>(url).pipe(
    tap(response => console.log('Raw response:', response)),
    map(response => {
      if (response && response.component && response.component.measures) {
        return {
          bugs: response.component.measures.find(m => m.metric === 'bugs')?.value,
          codeSmells: response.component.measures.find(m => m.metric === 'code_smells')?.value,
          coverage: response.component.measures.find(m => m.metric === 'coverage')?.value,
          vulnerabilities: response.component.measures.find(m => m.metric === 'vulnerabilities')?.value,
          newIssues: response.component.measures.find(m => m.metric === 'new_issues')?.value,
          totalIssues: response.component.measures.find(m => m.metric === 'total_issues')?.value
        };
      } else {
        throw new Error('Invalid response format');
      }
    })
  );
}




  

}
