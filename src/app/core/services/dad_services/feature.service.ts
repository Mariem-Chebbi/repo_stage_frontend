import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeatureService {

    apiurl = 'http://localhost:8085/ManajeroBackend/dad/features';

    constructor(private http: HttpClient) { }

    public add(feature: any, projectId: string): Observable<any> {
        return this.http.post<any>(`${this.apiurl}/add`, feature, {
            params: { idProject: projectId }
        });
    }

    public getAll(id): Observable<any> {
        return this.http.get<any>(`${this.apiurl}/getAll/${id}`);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiurl}/delete/${id}`);
    }

    public edit(feature): Observable<any> {
        return this.http.put<any>(`${this.apiurl}/edit`, feature);
    }

    public getByRelease(id): Observable<any> {
        return this.http.get<any>(`${this.apiurl}/get/release/${id}`);
    }

    getStatusPercentages(projectId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiurl}/status-percentages/${projectId}`);
    }

    public assign(features, iterationId): Observable<any> {
        return this.http.put<any>(`${this.apiurl}/assign/${iterationId}`, features);
    }

    public Unassign(features): Observable<any> {
        return this.http.put<any>(`${this.apiurl}/Unassign`, features);
    }

    public getByIteration(id): Observable<any> {
        return this.http.get<any>(`${this.apiurl}/get/iteration/${id}`);
    }

    public archive(id): Observable<any> {
        return this.http.put<any>(`${this.apiurl}/archive/${id}`, null);
    }

    public restore(id): Observable<any> {
        return this.http.put<any>(`${this.apiurl}/restore/${id}`, null);
    }
}
