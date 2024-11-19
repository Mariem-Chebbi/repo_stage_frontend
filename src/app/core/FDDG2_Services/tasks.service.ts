import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from '../FDDG2_Models/tasks';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/tasks';

  constructor(private http: HttpClient) { }

  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(`${this.baseUrl}/addTask`, task);
  }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseUrl}/getAllTasks`);
  }

  getTask(id: string): Observable<Tasks> {
    return this.http.get<Tasks>(`${this.baseUrl}/getTask/${id}`);
  }
  getPendingTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseUrl}/getPendingTasks`);
  }

  deleteTask(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/deleteTask/${id}`);
  }

  editTask(id: string, task: Tasks): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.baseUrl}/editTask/${id}`, task);
  }
  getTasksForExecutor(executorId: string): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseUrl}/getUserTasks/${executorId}`).pipe(
      map(tasks => tasks.map(task => ({
        taskId: task.taskId,
        taskName: task.taskName,
        description: task.description,
        createdAt: task.createdAt,
        deadline: task.deadline,
        status: task.status,
        user: task.user,
        assignemntUrl: task.assignemntUrl,
        assignemnt: task.assignemnt
      })))
    );
  }
  uploadFile(taskId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload/${taskId}`, formData, {
      responseType: 'text' // Expecting plain text response
    });
  }

  downloadFile(taskId: string): Observable<Blob> {
    const url = `${this.baseUrl}/download/${taskId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  confirmStatus(taskId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/confirm/${taskId}`, { status });
  }
  rejectStatus(taskId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/reject/${taskId}`, { status });
  }
  getFile(taskId: string): Observable<Blob> {
    const url = `${this.baseUrl}/download/${taskId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  
  updateTaskRatings(taskId: string,task:Tasks ): Observable<Tasks> {
    return this.http.put<Tasks>(`${this.baseUrl}/updateRatings/${taskId}`, task);
  }
  
}
