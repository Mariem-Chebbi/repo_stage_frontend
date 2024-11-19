import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectStatisticsDTO } from '../ProjectStatisticsDTO';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/statistics'; 

  constructor(private http: HttpClient) {}

  getTotalNumberOfProjects(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-projects`);
  }

  getTotalNumberOfTasks(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-tasks`);
  }

  getTotalNumberOfFeedbacks(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-feedbacks`);
  }

  getAllProjectsWithStatistics(): Observable<ProjectStatisticsDTO[]> {
    return this.http.get<ProjectStatisticsDTO[]>(`${this.baseUrl}/all-projects`);
  }

  // New methods

  getAverageTaskCompletionTime(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-task-completion-time`);
  }

  getPercentageOfCompletedTasks(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/percentage-of-completed-tasks`);
  }

  getAverageTaskCompletionTimeForProject(projectId: string): Observable<number> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<number>(`${this.baseUrl}/project-average-task-completion-time`, { params });
  }

  getPercentageOfCompletedTasksForProject(projectId: string): Observable<number> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<number>(`${this.baseUrl}/project-percentage-of-completed-tasks`, { params });
  }

  // New KPI methods

  getTotalProjectsCompleted(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-projects-completed`);
  }

  getTotalOngoingProjects(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-ongoing-projects`);
  }

  getAverageTaskDuration(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-task-duration`);
  }

  getAverageFeedbackRating(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-feedback-rating`);
  }

  getProjectCompletionPercentage(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/project-completion-percentage`);
  }

  getTaskCompletionRate(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/task-completion-rate`);
  }

  getFeedbackCountByRating(): Observable<Map<number, number>> {
    return this.http.get<Map<number, number>>(`${this.baseUrl}/feedback-count-by-rating`);
  }

  getTaskPriorityDistribution(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/task-priority-distribution`);
  }

  getAverageTasksPerProject(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/average-tasks-per-project`);
  }
}
