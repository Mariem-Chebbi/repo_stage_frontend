import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  updateTask(id: string, feedback: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, feedback);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignTaskToProject(taskId: string, projectId: string): Observable<Task> {
    const url = `${this.apiUrl}/${taskId}/assign-project/${projectId}`;
    return this.http.put<Task>(url, null);
  }
  restoreTask(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/restore`, {});
}
getAllArchivedTasks(): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.apiUrl}/archived`);
}
archiveTask(id: string): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}/archive`, {});
}

}