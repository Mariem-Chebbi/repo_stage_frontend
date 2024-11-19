import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/fddEnviroment';
import { subFeature } from '../FDDG2_Models/subFeature';
import { Tasks } from '../FDDG2_Models/tasks';
import { Feature } from '../FDDG2_Models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {


  private baseUrl = environment.baseUrl;
  private Feature_ENDPOINT: string = "/Feature";
  private subFeature_ENDPOINT: string = "/subFeature";
  private GET: string = "/get";
  private ADD: string = "/add";
  private UPDATE: string = "/update";
  private DELETE: string = "/delete/";
  private GETUSERS: string = "/getuserrs";
  private UPDATE1: string = "/update/";


  constructor(private http: HttpClient) { }

  getAllFeatures(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + this.Feature_ENDPOINT + this.GET);
  }

  getFeature(FeatureId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + this.Feature_ENDPOINT + this.GET + `${FeatureId}`);
  }

  addFeature(Feature: any, id: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.Feature_ENDPOINT}/add/${id}`, Feature);
  }
  updateFeature(Feature: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}` + this.Feature_ENDPOINT + this.UPDATE, Feature);
  }

  deleteFeature(FeatureId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}` + this.Feature_ENDPOINT + this.DELETE + `${FeatureId}`);
  }
  addsubFeature(subFeature: any, featureId: string): Observable<any> {
    const url = `${this.baseUrl}${this.subFeature_ENDPOINT}/add/${featureId}`; // Ensure correct path formatting
    return this.http.post<any>(url, subFeature);
  }
  getSubFeaturesForFeature(featureId: string): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.baseUrl}${this.subFeature_ENDPOINT}/forFeature/${featureId}`);
  }
  getAllusers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}` + this.Feature_ENDPOINT + this.GETUSERS);
  }

  updateSubFeature(subFeature: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}` + this.subFeature_ENDPOINT + this.UPDATE, subFeature);
  }  
  getProjectFeatures(id : string): Observable<Feature[]>{
    return this.http.get<Feature[]>(`${this.baseUrl}${this.Feature_ENDPOINT}/getProjectFeature/${id}`)
  }
}