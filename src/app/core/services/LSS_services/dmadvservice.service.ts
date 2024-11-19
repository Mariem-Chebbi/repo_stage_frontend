import { Injectable } from '@angular/core';
import { Requirement } from '../../models/LSS_models/Requirement';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ctq } from '../../models/LSS_models/Ctq';
import { Fmea } from '../../models/LSS_models/Fmea';
import { FailureMode } from '../../models/LSS_models/FailureMode';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionItem } from '../../models/LSS_models/ActionItem';
import { Prototype } from '../../models/LSS_models/Prototype';
import { PrototypeImg } from '../../models/LSS_models/PrototypeImg';
import { Feedback } from '../../models/LSS_models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class DmadvserviceService {

  private baseUrl = 'http://localhost:8085/ManajeroBackend/api/requirement';
  private baseCtq='http://localhost:8085/ManajeroBackend/api/ctq';
  protected basefmea='http://localhost:8085/ManajeroBackend/api/fmea'
  protected basefailuremode='http://localhost:8085/ManajeroBackend/api/failuremode'
  protected baseActionmode='http://localhost:8085/ManajeroBackend/api/actionitem'
  protected basePrototype='http://localhost:8085/ManajeroBackend/api/prototype'
  protected basePrototypeimg='http://localhost:8085/ManajeroBackend/api/ImagePrototype'
  protected baseFeedback='http://localhost:8085/ManajeroBackend/api/feedback'

  

  

  private selectedCharterIdSource = new BehaviorSubject<string>(null);
  selectedCharterId$ = this.selectedCharterIdSource.asObservable();

  
  constructor(private http: HttpClient) { }

  setSelectedCharterId(charterId: string) {
    this.selectedCharterIdSource.next(charterId);
  }
  addRequirement(requirement: Requirement, projectCharterId: string): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.baseUrl}/${projectCharterId}`, requirement);
  }
  addCtq(requirementId: string, ctq: Ctq): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.baseCtq}/${requirementId}/addctq`, ctq);
  }
  deleteRequirement(requirementId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${requirementId}`);
  }
  getCtqByReqId(id: string): Observable<Ctq[]> {
    return this.http.get<Ctq[]>(`${this.baseCtq}/${id}/get`);
  }
  // Method to get requirements by project charter ID
  getRequirementsByProjectCharterId(projectCharterId: string): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.baseUrl}/byProjectCharter/${projectCharterId}`);
  }
  updateRequirement(requirementId: string, requirement: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${requirementId}`, requirement);
  }
  removeCtq(requirementId: string, ctqId: string): Observable<Requirement> {
    return this.http.delete<Requirement>(`${this.baseCtq}/${requirementId}/remove/${ctqId}`);
  }
  ValidateCtq(id: string): Observable<Ctq> {
    return this.http.put<Ctq>(`${this.baseCtq}/valid/${id}`, {});
  }
  UnvalidateCtq(id: string): Observable<Ctq> {
    return this.http.put<Ctq>(`${this.baseCtq}/unvalid/${id}`, {});
  }
  //FMEAS
  getFmeasByProjectCharterId(projectCharterId: string): Observable<Fmea[]> {
    return this.http.get<Fmea[]>(`${this.basefmea}/byProjectCharter/${projectCharterId}`);
  }
  getFailureModes(fmeaId: string): Observable<FailureMode[]> {
    return this.http.get<FailureMode[]>(`${this.basefailuremode}/${fmeaId}/get`);
  }
  
  addFMEA(fmea: Fmea, projectCharterId: string): Observable<Fmea> {
    return this.http.post<Fmea>(`${this.basefmea}/${projectCharterId}`, fmea);
  }
  //archivage fmea
  archivefmea(Id: string): Observable<Fmea> {
    return this.http.put<Fmea>(`${this.basefmea}/archive/${Id}`, {});
  }
  unarchivefmea(Id: string): Observable<Fmea> {
    return this.http.put<Fmea>(`${this.basefmea}/unarchive/${Id}`, {});
  }
  
  getArchivedfmea(id: string): Observable<Fmea[]> {
    return this.http.get<Fmea[]>(`${this.basefmea}/Byarchive/${id}`);
  }
  ///
  deleteFmea(fmeaId: string): Observable<void> {
    return this.http.delete<void>(`${this.basefmea}/${fmeaId}`);
  }
  removeFailureMode(fmeaId: string, FMid: string): Observable<Fmea> {
    return this.http.delete<Fmea>(`${this.basefailuremode}/${fmeaId}/remove/${FMid}`);
  }
  
  addFmea(fmea: Fmea, projectCharterId: string): Observable<Fmea> {
    return this.http.post<Fmea>(`${this.basefmea}/${projectCharterId}`, fmea);
  }
  updateFmea(fmeaId: string, fmea: any): Observable<any> {
    return this.http.put(`${this.basefmea}/update/${fmeaId}`, fmea);
  }
  
  updateFailureModes(fmId: string, Failuremode: any): Observable<any> {
    return this.http.put(`${this.basefailuremode}/update/${fmId}`, Failuremode);
  }
  
  addFailureMode(fmeaId: string, fm: FailureMode): Observable<Fmea> {
    return this.http.post<Fmea>(`${this.basefailuremode}/${fmeaId}/add`, fm);
  }
  //archivage fm//
  archivefm(Id: string): Observable<FailureMode> {
    return this.http.put<FailureMode>(`${this.basefailuremode}/archive/${Id}`, {});
  }
  unarchivefm(Id: string): Observable<FailureMode> {
    return this.http.put<FailureMode>(`${this.basefailuremode}/unarchive/${Id}`, {});
  }
  getArchivedfm(id: string): Observable<FailureMode[]> {
    return this.http.get<FailureMode[]>(`${this.basefailuremode}/${id}/getarchived`);
  }
  //
  //actionitems
  getActionItems(fmid: string): Observable<ActionItem[]> {
    return this.http.get<ActionItem[]>(`${this.baseActionmode}/${fmid}/get`);
  }
  
  addActionItem(fmid: string, ai: ActionItem): Observable<FailureMode> {
    return this.http.post<FailureMode>(`${this.baseActionmode}/${fmid}/add`, ai);
  }
  
  updateActionItem(aiId: string, a: any): Observable<any> {
    return this.http.put(`${this.baseActionmode}/update/${aiId}`, a);
  }
  //archivage ai//
   archiveActionItem(actionItemId: string): Observable<ActionItem> {
    return this.http.put<ActionItem>(`${this.baseActionmode}/archive/${actionItemId}`, {});
  }
  unarchiveActionItem(actionItemId: string): Observable<ActionItem> {
    return this.http.put<ActionItem>(`${this.baseActionmode}/unarchive/${actionItemId}`, {});
  }
  
  getArchivedActions(fmid: string): Observable<ActionItem[]> {
    return this.http.get<ActionItem[]>(`${this.baseActionmode}/${fmid}/getArchive`);
  }
  
  ///
  removeActionItem( FMid: string,aiId: string): Observable<FailureMode> {
    return this.http.delete<FailureMode>(`${this.baseActionmode}/${FMid}/remove/${aiId}`);
  }
  ////PROTOTYPING

  getPrototypeByProjectCharterId(projectCharterId: string): Observable<Prototype[]> {
    return this.http.get<Prototype[]>(`${this.basePrototype}/${projectCharterId}/all`);
  }
  archivePrototype(id: string): Observable<Prototype> {
    return this.http.put<Prototype>(`${this.basePrototype}/archive/${id}`, {});
  }
  undoPrototype(id: string): Observable<Prototype> {
    return this.http.put<Prototype>(`${this.basePrototype}/undo/${id}`, {});
  }
  addPrototype(prototype: Prototype, projectCharterId: string): Observable<Prototype> {
    return this.http.post<Prototype>(`${this.basePrototype}/create/${projectCharterId}`, prototype);
  }
  deletePrototype( Id: string): Observable<Prototype> {
    return this.http.delete<Prototype>(`${this.basePrototype}/${Id}`);
  }
  getArchivedPrototypes(id: string): Observable<Prototype[]> {
    return this.http.get<Prototype[]>(`${this.basePrototype}/${id}/allArchived`);
  }
  addImageToPrototype(prototypeId: string, image: PrototypeImg): Observable<PrototypeImg> {
    return this.http.post<PrototypeImg>(`${this.basePrototypeimg}/${prototypeId}/images`, image);
  }
  
  updatePrototype(Id: string, a: any): Observable<any> {
    return this.http.put(`${this.basePrototype}/${Id}`, a);
  }
  getImagesByPrototypeId(id: string): Observable<PrototypeImg[]> {
    return this.http.get<PrototypeImg[]>(`${this.basePrototypeimg}/${id}/images`);
  }
  deleteImage(idProto: string, imageId: string): Observable<void> {
    return this.http.delete<void>(`${this.basePrototypeimg}/${imageId}/${idProto}`);
  }
///feedback
getFeedbacksByPrototypeId(prototypeId: string): Observable<Feedback[]> {
  return this.http.get<Feedback[]>(`${this.baseFeedback}/Get/${prototypeId}`);
}

addFeedbackToPrototype(prototypeId: string, feedback: Feedback, userid:string): Observable<Feedback> {
  return this.http.post<Feedback>(`${this.baseFeedback}/add/${prototypeId}/${userid}`, feedback);
}
calculateDefectRateByProjectCharterId(projectCharterId: string): Observable<number> {
  const url = `${this.baseCtq}/${projectCharterId}/defectRate`;
  return this.http.get<number>(url);
}

getActionItemCounts(projectCharterId: string): Observable<any> {
  return this.http.get<any>(`${this.basefmea}/${projectCharterId}/actionItemCounts`);
}
getIsMetPercentages(projectCharterId: string): Observable<{ [requirement: string]: number }> {
  return this.http.get<{ [requirement: string]: number }>(`${this.baseCtq}/${projectCharterId}/isMetPercentage`);
}
//sprint3
getArchivedFmeaCount(projectCharterId: string): Observable<number> {
  return this.http.get<number>(`${this.basefmea}/archivecount/${projectCharterId}`);
}

getArchivedPrototypeCount(projectId: string): Observable<number> {
  return this.http.get<number>(`${this.basePrototype}/archivecount/${projectId}`);
}
}
