import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.baseUrl}/tasks`;

  constructor(private http: HttpClient) {}
 // Method to delete a task by its ID
 deleteTask(taskId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${taskId}`).pipe(
    catchError((error) => {
      console.error("Error deleting task", error);
      return throwError(error);
    })
  );
}


  // Method to update a task
  updateTask(taskId: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, task).pipe(
      catchError((error) => {
        console.error("Error updating task", error);
        return throwError(error);
      })
    );
  }
}
