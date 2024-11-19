import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demonstration } from '../FDDG2_Models/demonstration';

@Injectable({
  providedIn: 'root'
})
export class DemonstrationService {
  private baseUrl = 'http://localhost:8085/ManajeroBackend/demo'
  constructor(private http:HttpClient) { }
  add(demoData :any):Observable<any>{
    const headers = {'Content-Type':'application/json'};
    return this.http.post(`${this.baseUrl}`+'/addDemo',demoData,{headers})
  }
  createDemo(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/addDemoWithImages`, data);
  }

  getAllDemos():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'/getAllDemos');
  }

  getOneDemo(codeDemo:String):Observable<Demonstration>{
    return this.http.get<Demonstration>(`${this.baseUrl}`+'/getOneDemo/'+codeDemo);
  }

  delete(codeDemo:String ):Observable<Demonstration>{
    return this.http.delete<Demonstration>(`${this.baseUrl}`+'/deleteDemo/'+codeDemo);
  }

  editDemo(codeDemo:String, demoData:any):Observable<any>{
    return this.http.put(`${this.baseUrl}`+'/editDemo/'+codeDemo,demoData)
  }
  getPhoto(photo: string): string{
    const photoUrl = `${this.baseUrl}/download/${photo}`;

    return `${this.baseUrl}/download/${photo}`;
  }
  
}
