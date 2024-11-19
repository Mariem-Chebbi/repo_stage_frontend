import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BacklogService {
  constructor(private http: HttpClient) {}
  AjouterBacklog(Backlog: any) {
    return this.http.post(`${environment.baseUrl}/Backlog/add`, Backlog).pipe(
      catchError((error) => {
        console.log("errrr", error);
        throw error;
      })
    );
  }

  updateBacklog(Backlog: any) {
    return this.http
      .put<any>(`${environment.baseUrl}/Backlog/edit`, Backlog)
      .pipe(
        catchError((error) => {
          console.log("errrr", error);
          throw error;
        })
      );
  }
}
