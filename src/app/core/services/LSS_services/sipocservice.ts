import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sipoc } from '../../models/LSS_models/Sipoc';
import { Supplier } from '../../models/LSS_models/Supplier';
import { Input } from '../../models/LSS_models/Input';
import { Process } from '../../models/LSS_models/Process';
import { Output } from '../../models/LSS_models/Output';
import { Customer } from '../../models/LSS_models/Customer';
import { Fivewhys } from '../../models/LSS_models/Fivewhys';
import { KanbanBoard } from '../../models/LSS_models/KanbanBoard';
import { Card } from '../../models/LSS_models/Card';
import { Solution } from '../../models/LSS_models/Solution';
import { ParetoData } from '../../models/LSS_models/ParetoData';

@Injectable({
  providedIn: 'root'
})
export class SIPOCserviceService {
private baseUrl = 'http://localhost:8085/ManajeroBackend/api/leansixsigma/sipoc'; 
private baseUrlFivewhys='http://localhost:8085/ManajeroBackend/api/fivewhys'
private baseUrlKanban='http://localhost:8085/ManajeroBackend/api/kanbanboard'

 // BehaviorSubject to store and emit the current Kanban ID
 private kanbanIdSubject = new BehaviorSubject<string>(null);
 selectedKanbanId$ = this.kanbanIdSubject.asObservable();



  private selectedCharterIdSource = new BehaviorSubject<string>(null);
  selectedCharterId$ = this.selectedCharterIdSource.asObservable();

  constructor(private http: HttpClient) { }

  //kanban booard //improve phase
  changeKanbanId(kanbanId: string): void {
    this.kanbanIdSubject.next(kanbanId);
  }

  getKanbanProgress(kanbanId: string): Observable<{ progress: number }> {
    return this.http.get<{ progress: number }>(`${this.baseUrlKanban}/${kanbanId}/progress`);
  }
  setSelectedCharterId(charterId: string) {
    this.selectedCharterIdSource.next(charterId);
  }
  deleteKanban(kanbanId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlKanban}/${kanbanId}`);
  }
  addKanban(projectId: string, kanban: KanbanBoard): Observable<KanbanBoard> {
    return this.http.post<KanbanBoard>(`${this.baseUrlKanban}/add/${projectId}`, kanban);
  }
   addTODOCard(kanbanId: string, card: Card): Observable<KanbanBoard> {
    return this.http.post<KanbanBoard>(`${this.baseUrlKanban}/${kanbanId}/addTODOCard`, card);
  }

  addInprogressCard(kanbanId: string, card: Card): Observable<KanbanBoard> {
    return this.http.post<KanbanBoard>(`${this.baseUrlKanban}/${kanbanId}/addPROGRESSCard`, card);
  }

  addDoneCard(kanbanId: string, card: Card): Observable<KanbanBoard> {
    return this.http.post<KanbanBoard>(`${this.baseUrlKanban}/${kanbanId}/addDONECard`, card);
  }
  updateCard(id_card: string, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.baseUrlKanban}/updateCard/${id_card}`, card);
  }

  removeCard(kanbanId: string, cardId: string): Observable<any> {
    return this.http.delete(`${this.baseUrlKanban}/remove/card/${kanbanId}/${cardId}`);
  }
  createKanban(projectCharterId: string, kanbanboard: KanbanBoard): Observable<KanbanBoard> {
    return this.http.post<KanbanBoard>(`${this.baseUrlKanban}/add/${projectCharterId}`, kanbanboard);
  }
  getKanbanByProjectCharterId(projectCharterId: string): Observable<KanbanBoard[]> {
    return this.http.get<KanbanBoard[]>(`${this.baseUrlKanban}/byProjectCharter/${projectCharterId}`);
  }

  getTodoCardsByKanbanId(kanbanId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrlKanban}/${kanbanId}/cards/todo`);
  }
  
  getDoneCardsByKanbanId(kanbanId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrlKanban}/${kanbanId}/cards/done`);
  }

  //fivewhys//analyse phase
  addFiveWhys(fivewhys: Fivewhys, projectCharterId: string): Observable<Fivewhys> {
    return this.http.post<Fivewhys>(`${this.baseUrlFivewhys}/${projectCharterId}`, fivewhys);
  }
  addSolutionToFivewhys(id: string, solution: Solution): Observable<Fivewhys> {
    return this.http.post<Fivewhys>(`${this.baseUrlFivewhys}/${id}/addsolution`, solution);
  }
  updateFivewhys(fivewhysId: string, fivewhys: Fivewhys): Observable<Fivewhys> {
    return this.http.put<Fivewhys>(`${this.baseUrlFivewhys}/${fivewhysId}`, fivewhys);
  }
  getFivewhysByProjectCharterId(projectCharterId: string): Observable<Fivewhys[]> {
    return this.http.get<Fivewhys[]>(`${this.baseUrlFivewhys}/byProjectCharter/${projectCharterId}`);
  }
  deleteFiveWhys(fivewhysId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlFivewhys}/${fivewhysId}`);
  }
  //sipoc//define phase
  getSipocByProjectCharterId(projectCharterId: string): Observable<Sipoc> {
    return this.http.get<Sipoc>(`${this.baseUrl}/${projectCharterId}/bypro`);
  }
  removeSupplier(id: string, supplierId: string): Observable<Sipoc> {
    return this.http.delete<Sipoc>(`${this.baseUrl}/${id}/removeSupplier/${supplierId}`);
  }
  removeInput(id: string, inputId: string): Observable<Sipoc> {
    return this.http.delete<Sipoc>(`${this.baseUrl}/${id}/removeInput/${inputId}`);
  }
  
  removeProcess(id: string, processId: string): Observable<Sipoc> {
    return this.http.delete<Sipoc>(`${this.baseUrl}/${id}/removeProcess/${processId}`);
  }
  
  removeOutput(id: string, OutputId: string): Observable<Sipoc> {
    return this.http.delete<Sipoc>(`${this.baseUrl}/${id}/removeOutput/${OutputId}`);
  }
  
  removeCustomer(id: string, customerId: string): Observable<Sipoc> {
    return this.http.delete<Sipoc>(`${this.baseUrl}/${id}/removeCustomer/${customerId}`);
  }
  addSupplier(sipocId: string, supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.baseUrl}/${sipocId}/addSupplier`, supplier);
  }
  addInput(sipocId: string, input: Input): Observable<Input> {
    return this.http.post<Input>(`${this.baseUrl}/${sipocId}/addInput`, input);
  }
  addProcess(sipocId: string, process: Process): Observable<Process> {
    return this.http.post<Process>(`${this.baseUrl}/${sipocId}/addProcess`, process);
  } 
  addOutput(sipocId: string, output: Output): Observable<Output> {
    return this.http.post<Output>(`${this.baseUrl}/${sipocId}/addOutput`, output);
  } 
  addCustomer(sipocId: string, customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/${sipocId}/addCustomer`, customer);
  }
  updateSupplier(supplierId: string, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.baseUrl}/updateSupplier/${supplierId}`, supplier);
  }
  updateInput(inputId: string, input: Input): Observable<Input> {
    return this.http.put<Input>(`${this.baseUrl}/updateInput/${inputId}`, input);
  }
  updateCustomer(customerId: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/updateCustomer/${customerId}`, customer);
  }
  updateOutput(outputId: string, output: Output): Observable<Output> {
    return this.http.put<Output>(`${this.baseUrl}/updateOutput/${outputId}`, output);
  }
  updateProcess(processId: string, process: Process): Observable<Process> {
    return this.http.put<Process>(`${this.baseUrl}/updateProcess/${processId}`, process);
  }

  createSipoc(projectCharterId: string, sipoc: Sipoc): Observable<Sipoc> {
    return this.http.post<Sipoc>(`${this.baseUrl}/${projectCharterId}`, sipoc);
  }
  deleteSipoc(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  //////sprint3
  countSuppliers(sipocId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${sipocId}/countSuppliers`);
  }

  countInputs(sipocId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${sipocId}/countInputs`);
  }

  countProcesses(sipocId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${sipocId}/countProcesses`);
  }

  countOutputs(sipocId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${sipocId}/countOutputs`);
  }

  countCustomers(sipocId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${sipocId}/countCustomers`);
  }
  //measure phase///
  getParetoData(): Observable<ParetoData[]> {
    return this.http.get<ParetoData[]>(`${this.baseUrlFivewhys}/pareto-data`);
  }

  //control phase ///

  getInprogressCardsByKanbanId(kanbanId: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.baseUrlKanban}/${kanbanId}/cards/inprogress`);
  }

  getCountByProject(projectId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrlFivewhys}/countByProject/${projectId}`);
  }

  getCountWithoutSolution(projectId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrlFivewhys}/countWithoutSolution/${projectId}`);
  }
  getCardMonthPercentages(kanbanId: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrlKanban}/total-per-month/${kanbanId}`);
  }
  getRadarChartData(idproject: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrlFivewhys}/radar-data/${idproject}`);
  }
  getCardStatusPercentages(kanbanId: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrlKanban}/status-percentages/${kanbanId}`);
  }
  

}
