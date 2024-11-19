import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../pages/f2/agile/project/project-class/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private baseUrl = 'http://localhost:8085/ManajeroBackend/project'

  private workspaceId: string = '';
  constructor(private http:HttpClient) { }
    createProject(ProjectData:any):Observable<any>{
      const  headers={'Content-Type':'application/json'};
      return this.http.post(`${this.baseUrl}`+'/addWS',ProjectData,{headers})
    }

    getAllProjects():Observable<any>{
      return this.http.get(`${this.baseUrl}`+'/getAllProjects');
    }

    delete(codeProject:String):Observable<Project>{
      return this.http.delete<Project>(`${this.baseUrl}`+'/deleteProject/'+codeProject);

    }
    
    editProject(codeProject:String,ProjectData:any):Observable<any>{
      return this.http.put(`${this.baseUrl}`+'/editProject'+ codeProject,ProjectData);
    }

    getOneProject(codeProject:String):Observable<Project>{
      return this.http.get<Project>(`${this.baseUrl}`+'/getProject/'+codeProject);
    }
    
    addProjectToWorkspace(id: string, project: Project): Observable<Project> {
      const  headers={'Content-Type':'application/json'};
      const url = `${this.baseUrl}/addProjectToWS/${id}`;
      
      return this.http.post<Project>(url, project, {headers});
    }
  
    // Method to fetch projects by workspace ID
    getWSProjects(id: string): Observable<Project[]> {
      const url = `${this.baseUrl}/getWSProject/${id}`;
      return this.http.get<Project[]>(url);
    }
    setWorkspaceId(id: string): void {
      this.workspaceId = id;
    }
  
    getWorkspaceId(): string {
      return this.workspaceId;
    }
    analyzeFeedback(feedback: string): Observable<string> {
      return this.http.post<string>(`${this.baseUrl}`+`/analyze`, feedback);
    }
}

