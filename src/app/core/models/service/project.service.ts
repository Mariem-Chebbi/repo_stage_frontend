import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addTaskToProject(projectId: string, task: Task): Observable<Project> {
    const url = `${this.apiUrl}/${projectId}/add-task`;
    return this.http.put<Project>(url, task);
  }
  restoreProject(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/restore`, {});
}
getAllArchivedProjects(): Observable<Project[]> {
  return this.http.get<Project[]>(`${this.apiUrl}/archived`);
}
archiveProject(id: string): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}/archive`, {});
}
}