import { Injectable } from '@angular/core';
import {HttpClient,  HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Project, SearchResults} from 'jira.js/out/version3/models';
import {JiraAuthService} from './jira-auth.service';
import {SearchForIssuesUsingJql} from 'jira.js/out/version3/parameters';
import {ProjectInfo} from 'azure-devops-node-api/interfaces/CoreInterfaces';
import {environment} from '../../../../environments/environment';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {DemoModel} from '../../models/poker_planning_grp2_models/DemoModel';
import {BenefitsModel} from '../../models/poker_planning_grp2_models/BenefitsModel';
import {LimitsModel} from '../../models/poker_planning_grp2_models/LimitsModel';
import {StepsModel} from '../../models/poker_planning_grp2_models/stepsModel';
import {NewsModel} from '../../models/poker_planning_grp2_models/NewsModel';
import {DiagramModel} from '../../models/poker_planning_grp2_models/DiagramModel';
import {SessionModel} from '../../models/poker_planning_grp2_models/SessionModel';
import {IssuesRequest} from '../../models/poker_planning_grp2_models/ImportRepresentation/IssuesRequest';
import {VoteModel} from '../../models/poker_planning_grp2_models/VoteModel';
import {UserModel} from '../../models/poker_planning_grp2_models/UserModel';
import {IssuesModel} from '../../models/poker_planning_grp2_models/IssuesModel';

@Injectable({providedIn: 'root'})
export class ApiService {

  readonly API_URL = 'http://localhost:8085/ManajeroBackend';



  constructor(private httpClient: HttpClient,
              private jiraAuthService: JiraAuthService,
  ) { }

  // ********************* Demo services ************************
  addDemo(demo: DemoModel): Observable<DemoModel[]> {
    return this.httpClient.post<DemoModel[]>(`${this.API_URL}/adddemo`, demo);
  }
  getDemo(): Observable<DemoModel[]> {
    return this.httpClient.get<DemoModel[]>(`${this.API_URL}/getDemo`);
  }
  updateDemo ( id: string, demo: DemoModel): Observable<DemoModel> {
    const url = `${this.API_URL}/updateDemo/${id}`;
    return this.httpClient.put<DemoModel>( url, demo );
  }
  deleteDemo(id: string) {
    return this.httpClient.delete<void>(`${this.API_URL}/deletedemo/${id}`);
  }

  // ************** benefits services *******************
  addBenefit(benefit: BenefitsModel): Observable<BenefitsModel> {
    return this.httpClient.post<BenefitsModel>(`${this.API_URL}/addBenefits`, benefit);
  }
  updateBenifits ( id: string, benefits: BenefitsModel): Observable<BenefitsModel> {
    const url = `${this.API_URL}/updateBenefit/${id}`;
    return this.httpClient.put<BenefitsModel>( url, benefits );
  }

  deleteBenefit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletebenefit/${id}`);
  }

  getBenefits(): Observable<BenefitsModel[]> {
    return this.httpClient.get<BenefitsModel[]>(`${this.API_URL}/getBenefits`);
  }


  // ********************** limits services ***********************
  addLimit(limit: LimitsModel): Observable<LimitsModel> {
    return this.httpClient.post<LimitsModel>(`${this.API_URL}/addLimits`, limit);
  }
  getLimits(): Observable<LimitsModel[]> {
    return this.httpClient.get<LimitsModel[]>(`${this.API_URL}/getLimits`);
  }

  updateLimits ( id: string, limits: LimitsModel): Observable<LimitsModel> {
    const url = `${this.API_URL}/updateLimit/${id}`;
    return this.httpClient.put<LimitsModel>( url, limits );
  }
  deleteLimit(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deletelimit/${id}`);
  }


// ************************ steps services ****************************
  addStep(step: StepsModel): Observable<StepsModel[]> {
    return this.httpClient.post<StepsModel[]>(`${this.API_URL}/addSteps`, step);
  }
  getSteps(): Observable<StepsModel[]> {
    return this.httpClient.get<StepsModel[]>(`${this.API_URL}/getSteps`);
  }
  updateStep ( id: string, step: StepsModel): Observable<StepsModel> {
    const url = `${this.API_URL}/updateStep/${id}`;
    return this.httpClient.put<StepsModel>( url, step );
  }
  deleteStep(id: string): Observable<void> {
    const url = `${this.API_URL}/deleteStep/${id}`;
    return this.httpClient.delete<void>(url);
  }



  // ******************* News services ******************************
  addNew(news: NewsModel): Observable<NewsModel[]> {
    return this.httpClient.post<NewsModel[]>(`${this.API_URL}/addNews`, news);
  }
  getNews(): Observable<NewsModel[]> {
    return this.httpClient.get<NewsModel[]>(`${this.API_URL}/getNews`);
  }
  updateNews ( id: string, news: NewsModel): Observable<NewsModel> {
    const url = `${this.API_URL}/updateNew/${id}`;
    return this.httpClient.put<NewsModel>( url, news );
  }
  deleteNew(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteNews/${id}`);
  }

  // ********************** Diagram services ***********************
  addDiagram(diagram: DiagramModel): Observable<DiagramModel> {
    return this.httpClient.post<DiagramModel>(`${this.API_URL}/addDiagram`, diagram);
  }
  getDiagrams(): Observable<DiagramModel[]> {
    return this.httpClient.get<DiagramModel[]>(`${this.API_URL}/getDiagrams`);
  }

  updateDiagram ( id: string, diagrams: DiagramModel): Observable<DiagramModel> {
    const url = `${this.API_URL}/updateDiagram/${id}`;
    return this.httpClient.put<DiagramModel>( url, diagrams );
  }
  deleteDiagram(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteDiagram/${id}`);
  }

  // ********************** Session services ***********************

  addSession(session: SessionModel): Observable<SessionModel> {
    return this.httpClient.post<SessionModel>(`${this.API_URL}/addSession`, session);
  }
  getSession(id: string): Observable<SessionModel> {
    return this.httpClient.get<SessionModel>(`${this.API_URL}/getSession/${id}`);
  }
  updateSession ( id: string, sessions: SessionModel): Observable<SessionModel> {
    const url = `${this.API_URL}/updateSession/${id}`;
    return this.httpClient.put<SessionModel>( url, sessions );
  }
  getSessionById(id: string): Observable<SessionModel> {
    const url = `${this.API_URL}/getSession/${id}`;
    return this.httpClient.get<SessionModel>(url);
  }
  // Méthode pour fermer une session
  closeSession(sessionId: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/close/${sessionId}`, {});
  }
  // Méthode pour obtenir le statut de la session
  getSessionStatus(sessionId: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/status/${sessionId}`);
  }

  // ********************** Issues services ***********************
  addIssue(sessionId: string, issue: IssuesModel): Observable<IssuesModel> {
    return this.httpClient.post<IssuesModel>(`${this.API_URL}/session/${sessionId}`, issue);
  }
  getIssuesBySessionId(sessionId: string): Observable<IssuesModel[]> {
    return this.httpClient.get<IssuesModel[]>(`${this.API_URL}/session/${sessionId}`);
  }
  updateIssue ( id: string, issues: IssuesModel): Observable<IssuesModel> {
    const url = `${this.API_URL}/updateIssue/${id}`;
    return this.httpClient.put<IssuesModel>( url, issues );
  }
  deleteIssue(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/deleteIssue/${id}`);
  }
  getIssues(): Observable<IssuesModel[]> {
    return this.httpClient.get<IssuesModel[]>(`${this.API_URL}/getIssues`);
  }
  save(issue: IssuesModel): Observable<IssuesModel> {
    return this.httpClient.post<IssuesModel>(`${this.API_URL}/save}`, issue);
  }
  getProjects(): Observable<Project[]> {
    const accessToken = this.jiraAuthService.getAccessToken();
    return this.httpClient.get<Project[]>(`${this.jiraAuthService.jiraApiEndpoint}/project`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  getProjectIssues(projectName: string, paramters?: SearchForIssuesUsingJql): Observable<SearchResults> {
    const accessToken = this.jiraAuthService.getAccessToken();
    return this.httpClient.get<SearchResults>(`${this.jiraAuthService.jiraApiEndpoint}/search?jql=project=${projectName}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

    });
  }

  insertUserStory(issues: IssuesRequest[], sessionId: string): Observable<IssuesModel> {
    return this.httpClient.post<IssuesModel>(`${this.API_URL}/insert/session/${sessionId}`, issues);
  }


  getProjectsAzure(): Observable<ProjectInfo[]> {
    return this.httpClient.get<ProjectInfo[]>(`${environment.azureConfig.apiEndpoint}/_apis/projects${environment.azureConfig.apiVersion}`);
  }


  getWorkItems(projectName: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.azureConfig.apiEndpoint}/${projectName}/_apis/wit/wiql${environment.azureConfig.apiVersion}`, {
      'query': 'Select [System.Id] From WorkItems',
    }).pipe(
      mergeMap(briefItems => {
          const ids = briefItems.workItems.map((workItem: any) => workItem.id);
          return this.httpClient.post<any>(`${environment.azureConfig.apiEndpoint}/${projectName}/_apis/wit/workitemsbatch${environment.azureConfig.apiVersion}`, {'ids': ids});
        },
      ),
    );
  }

  uploadFile(file: File, sessionId: string): Observable<number> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<number>(`${this.API_URL}/upload/${sessionId}`, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          return Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          return event.body;
        }
      }),
    );
  }

  findBySessionId(sessionId: string) {
    return this.httpClient.get<IssuesModel[]>(`${this.API_URL}/session/${sessionId}`);
  }
  addIssuesBySessionId(issues: IssuesModel, sessionId: string ) {
    return this.httpClient.post<IssuesModel[]>(`${this.API_URL}/ajoutIssues/${sessionId}`, issues);

  }

  // ******************** Vote services *********************

  addVote(vote: VoteModel): Observable<VoteModel> {
    return this.httpClient.post<VoteModel>(`${this.API_URL}/votes/session/submitVote`, vote);
  }

  getVotes(sessionId: string, issueId: string): Observable<VoteModel[]> {
    return this.httpClient.get<VoteModel[]>(`${this.API_URL}/votes/session/${sessionId}/issue/${issueId}`);
  }
  getAverageVote(sessionId: string, issueId: string): Observable<number> {
    const params = new HttpParams()
      .set('sessionId', sessionId)
      .set('issueId', issueId);
    return this.httpClient.get<number>(`${this.API_URL}/votes/getaverage`, { params });
  }
  // ******************** User services *********************
  addUser(sessionId: string, user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.API_URL}/session/addUser/${sessionId}`, user);
  }
  getUsersBySession(sessionId: string): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.API_URL}/session/user/${sessionId}`);
  }
  getUserById(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/getUserById/${userId}`);
  }
  sendEmail(to: string, subject: string, body: string): Observable<any> {
    const params = {
      to: to,
      subject: subject,
      body: body,
    };
    return this.httpClient.post(`${this.API_URL}/send`, null, { params: params });
  }

  // user Invitation
  inviteUserToSession(sessionId: string, email: string): Observable<string> {
    if (!sessionId) {
      throw new Error('Session ID is required');
    }
    const url = `${this.API_URL}/${sessionId}/invite`;
    const params = new HttpParams().set('email', email);
    return this.httpClient.post<string>(url, null, { params });
  }
  /************************************ Result services *******************************/
  countUsersInSession(sessionId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.API_URL}/${sessionId}/users/total`);
  }
  countIssuesInSession(sessionId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.API_URL}/${sessionId}/issues/total`);
  }
  // Méthode pour obtenir le nombre de votes par issueId
  getVoteCountByIssueId(issueId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.API_URL}/votes/count/${issueId}`);
  }
  getVotesByIssueId(issueId: string): Observable<VoteModel[]> {
    return this.httpClient.get<VoteModel[]>(`${this.API_URL}/votes/issue/${issueId}`);
  }
  getCardUsageStatistics(sessionId: string): Observable<{ [key: string]: number }> {
    return this.httpClient.get<{ [key: string]: number }>(`${this.API_URL}/votes/statistics?sessionId=${sessionId}`);
  }
  getVoteFrequencyForSession(sessionId: string): Observable<Map<string, number>> {
    return this.httpClient.get<Map<string, number>>(`${this.API_URL}/votes/sessions/${sessionId}/vote-frequency`);
  }
  getVoteDistribution(sessionId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/votes/sessions/${sessionId}/vote-distribution`);
  }

}
