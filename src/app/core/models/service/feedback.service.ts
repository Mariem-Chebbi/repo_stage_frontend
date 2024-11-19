import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8085/ManajeroBackend/api/feedbacks_ASD';

  constructor(private http: HttpClient) {}

  createFeedback(feedbackData: FormData): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedbackData);
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getFeedbackById(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`);
  }

  updateFeedback(id: string, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback);
  }

  deleteFeedback(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignFeedbackToProject(feedbackId: string, projectId: string): Observable<Feedback> {
    const url = `${this.apiUrl}/${feedbackId}/assign-project/${projectId}`;
    return this.http.put<Feedback>(url, null);
  }
  archiveFeedback(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/archive`, {});
}

restoreFeedback(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/restore`, {});
}
getAllArchivedFeedbacks(): Observable<Feedback[]> {
  return this.http.get<Feedback[]>(`${this.apiUrl}/archived`);
}


}
