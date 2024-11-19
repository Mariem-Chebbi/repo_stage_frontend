import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { create } from 'domain';
import { Observable } from 'rxjs';
import { WorkSpaceModule } from '../../pages/f2/agile/work-space/work-space.module';
import { Workspace } from '../FDDG2_Models/workspace';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/WorkSpace'


  constructor(private http:HttpClient) { }
    createWorkSpace(workspaceData:any):Observable<any>{
      const  headers={'Content-Type':'application/json'};
      return this.http.post(`${this.baseUrl}`+'/addWS',workspaceData,{headers})
    }

    getAllWorkSpaces():Observable<any>{
      return this.http.get(`${this.baseUrl}`+'/getAllWS');
    }

    delete(codeWS:String):Observable<Workspace>{
      return this.http.delete<Workspace>(`${this.baseUrl}`+'/deleteWS/'+codeWS);

    }
    
    editWorkSpace(codeWS:String,workspaceData:any):Observable<any>{
      return this.http.put(`${this.baseUrl}`+'/editWS'+ codeWS,workspaceData);
    }

    getOneWorkSpace(codeWS:String):Observable<Workspace>{
      return this.http.get<Workspace>(`${this.baseUrl}`+'/getWs/'+codeWS);
    }
    getUserWorkSpace(userId:String):Observable<Workspace[]>{
      return this.http.get<Workspace[]>(`${this.baseUrl}`+'/getUserWS/'+userId);
    }
  
}
