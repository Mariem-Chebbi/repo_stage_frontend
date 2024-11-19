import {Component, HostListener, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {InvitePlayersComponent} from './invite-players/invite-players.component';
import { Location } from '@angular/common';
// @ts-ignore
import confetti from 'canvas-confetti';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IssuesUpdateComponent} from './issues-update/issues-update.component';
import {SessionUpdateComponent} from './session-update/session-update.component';
import {VotingHistoryComponent} from './voting-history/voting-history.component';
import {SearchResults, Project} from 'jira.js/out/version3/models';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import {MsalService} from '@azure/msal-angular';
import {OAuthService} from 'angular-oauth2-oidc';
import {IssuesRequest} from '../../../../core/models/poker_planning_grp2_models/ImportRepresentation/IssuesRequest';
import {SessionModel} from '../../../../core/models/poker_planning_grp2_models/SessionModel';
import {IssuesModel} from '../../../../core/models/poker_planning_grp2_models/IssuesModel';
import {AzureDevOpsProject} from '../../../../core/models/poker_planning_grp2_models/ImportRepresentation/AzureDevOpsProject';
import {VoteModel} from '../../../../core/models/poker_planning_grp2_models/VoteModel';
import {UserModel} from '../../../../core/models/poker_planning_grp2_models/UserModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';
import {JiraAuthService} from '../../../../core/services/poker_planning_grp2_services/jira-auth.service';
import {AuthAzureServiceService} from '../../../../core/services/poker_planning_grp2_services/auth-azure-service.service';
import {AuthServiceService} from '../../../../core/services/poker_planning_grp2_services/auth-service.service';
@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']})
export class RoomComponent implements OnInit {
  sessionId: string | null = null;
  issueId: string | null = null;
  userId: string | null = null;
  selectedIssueImported: IssuesRequest | null = null;
  session: SessionModel;
  issu: IssuesRequest;
  cards: string[] = [];
  selectedCard: string | null = null;
  id:  string | null = null;
  isSidebarOpen = false;
  isDropdownOpen = false;
  selectedOption: string;
  showForm = false;
  issueTitle = '';
  revealedCard: number | string | null = null;
  addIssuesForm: FormGroup;
  issues: IssuesModel[] = [];
  sessions: SessionModel[] = [];
  loading: boolean = false;
  page: number = 1; // Page de départ
  pageSize: number = 20; // Nombre d'éléments par page
  private isLoading: boolean = false;
  dropdownVisible = false;
  selectedIssue: IssuesModel | null = null;
  selectedIssueAzure: IssuesRequest | null = null;

  isDropdownSessionOpen = false;
  dropdownOpen: { [key: number]: boolean } = {}; ////// dropdown ///////////
  // issues in session
  selectedAzureProjectName: string;
  jiraIssues: SearchResults;
  azure: AzureDevOpsProject [] = [];
  jiraLoginSuccessful: boolean = false;
  azureLoginSuccessful: boolean = false;
  jiraProjects: Project[] = [];
  issuesRequests: IssuesRequest[] = [];
  isss: IssuesRequest;
  iss: IssuesModel = new IssuesModel();
  issue: IssuesModel[] = [];
  lastAddedIssues: any;
  selectedJiraProjectName: string;
  modalRef?: BsModalRef;
  submittedDescription: string = '';
  hidden: boolean;
  state: string | null = null;
  code: string | null = null;
  selectedIssueId: string | null = null;
  votes: VoteModel[] = [];
  users: UserModel[] = [];
  dialogOpened: boolean = false; // Flag to track dialog state
  averageVote: any;
  currentUserTurn: string;
  private socketSubscription: any; // Stocke l'abonnement au WebSocket
  userName: string | null = null;
  isSessionClosed: boolean = false;
  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dialogService: NbDialogService,
              private location: Location,
              private toastrService: NbToastrService,
              private fb: FormBuilder,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private jiraAuthService: JiraAuthService,
              private azureAuthService: AuthAzureServiceService,
              private azureLogin: MsalService,
              private authService: AuthServiceService,
              private oauthService: OAuthService,
  ) {}
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.getSessionDetails(this.sessionId);
    });
    if (!this.sessionId) {
      this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    }
    this.loadIssues();
    this.addIssuesForm = this.fb.group({
      issueDescription: ['', Validators.required],
    });
    this.azureLogin.initialize();
    this.hidden = true;

    this.route.queryParams.subscribe((params) => {
      this.state = params['state'];
      this.code = params['code'];
      this.handleOAuthCallback();
    });

    this.apiService.getUsersBySession(this.sessionId).subscribe(
      (users: UserModel[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Failed to load users:', error);
      },
    );
    // Vérifiez le statut de la session lors de l'initialisation
    this.checkSessionStatus(this.sessionId);
  }
/*  closeSession(sessionId: string) {
    this.apiService.closeSession(sessionId).subscribe(
      response => {
        console.error('Session closed successfully');
        this.isSessionClosed = true; // Mettre à jour l'état de la session
      },
      error => {
        console.error('Error closing session', error);
      },
    );
  }*/
  confirmSessionClose(sessionId: string) {
    // Vérifiez que la session peut être fermée, par exemple en validant un formulaire
    if (this.isValidToClose()) {
      // Affichez une boîte de dialogue de confirmation
      if (confirm('Are you sure you want to close this session?')) {
        this.closeSession(sessionId);
        this.loadIssues(); // Si nécessaire, rechargez les issues ou d'autres données
      }
    } else {
      this.toastrService.danger('Please complete all necessary fields or actions', 'Error');
    }
  }

// Exemple de méthode pour vérifier si la session peut être fermée
  isValidToClose(): boolean {
    // Implémentez la logique de validation nécessaire
    return true; // Modifier en fonction des conditions réelles
  }
  closeSession(sessionId: string) {
    this.apiService.closeSession(sessionId).subscribe(
      response => {
        console.error('Session closed successfully');
        this.isSessionClosed = true;
      },
      error => {
        console.error('Error closing session', error);
      },
    );
  }
  checkSessionStatus(sessionId: string) {
    this.apiService.getSessionStatus(sessionId).subscribe(
      response => {
        this.isSessionClosed = response.message === 'Session is closed';
      },
      error => {
        console.error('Error fetching session status', error);
      },
    );
  }
  openInviteDialog() {
    // Open the dialog with the current session ID
    this.dialogService.open(InvitePlayersComponent, {
      context: {
        title: 'Invite Players',
        sessionId: this.sessionId,
      },
    });
  }
  // ***********  MOYENNE *********************
 /* loadAverageVote(sessionId: string, issueId: string) {
   this.apiService.getAverageVote(sessionId, issueId).subscribe(
      (average: any) => {
        this.averageVote = average;
      },
      (error) => {
        console.error('Error fetching average vote:', error);
      },
    );
  }*/
  loadAverageVote(sessionId: string, issueId: string) {
    this.apiService.getAverageVote(sessionId, issueId).subscribe(
      (average: any) => {
        this.averageVote = average;
      },
      (error) => {
        console.error('Error fetching average vote:', error);
      },
    );
  }
  // ******************VoteNormal+voteImported *****************
  toggleVote(issue: IssuesModel) {
    if (this.selectedIssue && this.selectedIssue.id === issue.id) {
      this.selectedCard = null;
      this.revealedCard = null;
      this.selectedIssue.isVoting = !this.selectedIssue.isVoting;
    } else {
      this.issues.forEach(i => i.isVoting = false);
      this.selectedCard = null;
      this.revealedCard = null;
      this.selectedIssue = issue;
      this.selectedIssueId = issue.id.toString();
      issue.isVoting = true;
    }
  }
  toggleVote2(issues: IssuesRequest) {
    if (this.selectedIssueImported && this.selectedIssueImported.id === issues.id) {
      this.selectedCard = null;
      this.revealedCard = null;
      this.selectedIssueImported.isVoting = !this.selectedIssueImported.isVoting;
    } else {
      this.issuesRequests.forEach((i) => (i.isVoting = false));
      this.selectedCard = null;
      this.revealedCard = null;

      this.selectedIssueImported = issues;
      this.selectedIssueId = issues.id; // Update selectedIssueId here
      issues.isVoting = true;
    }
  }
  selectCard(card: string) {
    this.selectedCard = card;
  }
  revealCard(): void {
    if (this.selectedCard !== null) {
      this.revealedCard = this.selectedCard;
      if (this.selectedIssue !== null) {
       // this.submitVote();
        this.submitVote(this.issueId);
      } else if (this.selectedIssueImported !== null) {
        this.submitVoteForIssuesRequest();
      }

      this.triggerConfetti();
    } else {
      console.error('No card selected.');
    }
  }
  submitVote(issueId: string) {
    this.apiService.getUsersBySession(this.sessionId).subscribe({
      next: (users) => {
        console.info('Users:', users); // Log the array of users
        if (users && users.length > 0) {
          const user = users[users.length - 1]; // Use the last user in the array
          if (user && user.id) {
            this.apiService.getSessionById(this.sessionId).subscribe({
              next: (session) => {
                console.info('Session:', session); // Debugging line
                if (session) {
                  const sessionId = session.id;
                  const userId = user.id; // Use the userId from the user object

                  const vote: VoteModel = {
                    sessionId: sessionId,
                    issueId: this.selectedIssueId, // Use the ID from selectedIssueId
                    userName: this.userName,
                    userId: userId, // Use the userId from the user object
                    vote: this.selectedCard,
                  };

                  this.apiService.addVote(vote).subscribe({
                    next: (response) => {
                      console.info('Vote submitted successfully', response);

                      // Call additional methods after the vote is successfully submitted
                      this.loadVotes(sessionId, this.selectedIssueId);
                       this.loadAverageVote(sessionId, this.selectedIssueId); // Corrected issue parameter
                      this.triggerConfetti();
                    },
                    error: (error) => {
                      console.error('Failed to submit vote', error);
                    },
                  });
                } else {
                  console.error('Session is undefined or not found');
                }
              },
              error: (error) => {
                console.error('Failed to get session', error);
              },
            });
          } else {
            console.error('User ID is not available');
          }
        } else {
          console.error('No users found for the given session');
        }
      },
      error: (error) => {
        console.error('Failed to get users by session', error);
      },
    });
  }
  submitVoteForIssuesRequest() {
    if (this.selectedCard !== null && this.selectedIssueId !== null) {
      const vote: VoteModel = {
        sessionId: this.session.id,
        issueId: this.selectedIssueId,
        vote: this.selectedCard,
        userId: this.userId,
        userName: this.userName,
      };
      this.apiService.addVote(vote).subscribe((response) => {
        const issue = this.issuesRequests.find(i => i.id === this.selectedIssueId);
        if (issue) {
          issue.hasVoted = true;
          issue.isVoting = false;
          issue.lastVoteValue = this.selectedCard;
        }
        this.revealedCard = this.selectedCard;
        this.selectedCard = null;
        this.selectedIssueImported = null;
        this.selectedIssueId = null;
        this.loadVotes(this.session.id, this.selectedIssueId);
         this.loadAverageVote(this.session.id, issue.id);
        this.triggerConfetti(); // Fonction pour célébrer le vote
      });
    } else {
      console.error('No card selected or no issue selected.');
    }
  }
// ***********************************************************
  loadIssues() {
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe((issues: IssuesModel[]) => {
      this.issues = issues;
    });
  }
  loadSessions() {
    this.apiService.getSessionById(this.sessionId).subscribe((session: SessionModel) => {
      this.session = session;
    });
  }
  canVote(): boolean {
    return this.currentUserTurn === this.userId;
  }
  getSessionDetails(sessionId: string) {
    this.apiService.getSession(sessionId).subscribe(
      (session: SessionModel) => {
        this.session = session;
        this.cards = this.getCardsForSystem(session.votingSystem);
        if (!this.dialogOpened) {
          this.dialogOpened = true;
        }
      },
      (error) => {
        console.error('Error fetching session details:', error);
      },
    );
  }
  getCardsForSystem(system: string): string[] {
    switch (system) {
      case 'FIBONACCI':
        return [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
      case 'MODIFIED_FIBONACCI':
        return [' ☕', '0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
      case 'TSHIRTS':
        return [' ☕', 'XS', 'S', 'M', 'L', 'XL'];
      case 'POWERS_OF_2':
        return [' ☕', '0', '1', '2', '4', '8', '16', '32', '64'];
      default:
        return [];
    }
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  cancel() {
    this.showForm = false;
    this.issueTitle = '';
  }

  confirmIssueAdd() {
    if (this.addIssuesForm.valid) {
      if (confirm('Are you sure you want to add this issue?')) {
        this.addIssue();
        this.loadIssues();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }
  addIssue() {
    const newIssue: IssuesModel = this.addIssuesForm.value;
    this.apiService.addIssue(this.sessionId, newIssue).subscribe(
      (issue) => {
        this.issues.push(issue);
        this.addIssuesForm.reset();
        this.toastrService.success('issue added successfully', 'Success');
        this.loadIssues();
      },
      (error) => {
        console.error('Error adding the issue:', error);
        this.toastrService.danger('Failed to add the issue', 'Error');
      },
    );
  }
  toggleDropdownSession() {
    this.isDropdownSessionOpen = !this.isDropdownSessionOpen;
  }
  openSessionUpdate(session: SessionModel) {
    this.dialogService.open(SessionUpdateComponent, {
      context: {
        title: 'Update issue',
        session: {...session},
      },
    }).onClose.subscribe(() => this.loadSessions());
  }
  openVotingHistory() {
    this.dialogService.open(VotingHistoryComponent, {
      context: {
      },
    }).onClose.subscribe(() => this.loadIssues());
  }
  ///////////////////////////// dropdown ///////////////////////

  toggleDropdownIssue(issueId: number) {
    this.dropdownOpen[issueId] = !this.dropdownOpen[issueId];
  }

  openIssueUpdate(issue: IssuesModel) {
    this.dialogService.open(IssuesUpdateComponent, {
      context: {
        title: 'Update issue',
        issue: { ...issue },
      },
    }).onClose.subscribe(() => this.loadIssues());
  }

  deleteIssue(id: string) {
    if (confirm('Are you sure you want to delete this issue?')) {
      this.apiService.deleteIssue(id).subscribe(
        () => {
          this.issues = this.issues.filter((b) => b.id !== id);
        },
        (error) => {
          console.error('Error deleting the issue:', error);
        },
      );
    }
  }

  moveIssueToTop(issueId: number) {
    const index = this.issues.findIndex(issue => issue.id === issueId.toString());
    if (index > 0) {
      const [issue] = this.issues.splice(index, 1);
      this.issues.unshift(issue);
    }
  }

  moveIssueToBottom(issueId: number) {
    const index = this.issues.findIndex(issue => issue.id === issueId.toString());
    if (index !== -1 && index < this.issues.length - 1) {
      const [issue] = this.issues.splice(index, 1);
      this.issues.push(issue);
    }
  }
// **************Issues Process ****************++
  openBootstrapModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  hideModal() {
    this.modalRef?.hide();
  }

  jiraButtonClick(template: TemplateRef<void>) {
    if (!this.jiraLoginSuccessful) {
      this.loginToJira();
    } else {
      this.getJiraProjects(template);
    }
  }
  azureButtonClick(template: TemplateRef<void>) {
    if (!this.azureLoginSuccessful) {
      this.loginToAzure();
    } else {
      this.getAzureProjects(template);
    }
  }

  getAzureProjects(template: TemplateRef<void>) {
    if (this.azureLoginSuccessful) {
      this.apiService.getProjectsAzure().subscribe((response: any) => {
        const responses: AzureDevOpsProject[] = [];
        if (response && response.value && response.value.length > 0) {
          response.value.forEach((projects: any) => {
            const id = projects.id;
            const name = projects.name;
            const newProject = new AzureDevOpsProject(id, name);
            responses.push(newProject);
          });

        }
        this.azure = responses;
        this.openBootstrapModal(template);
      });

    }

  }

  loginToAzure() {
    this.azureAuthService.login();
    this.azureLoginSuccessful = true;
  }

  loginToJira() {
    this.jiraAuthService.login();
    this.jiraLoginSuccessful = true;
  }
  getJiraProjects(template: TemplateRef<void>) {
    if (this.jiraLoginSuccessful) {
      this.apiService.getProjects().subscribe(value => {
        this.jiraProjects = value;
        this.openBootstrapModal(template);
      });
    }
  }
  selectJiraProject(jiraProjectName: any, template: TemplateRef<void>) {

    this.selectedJiraProjectName = jiraProjectName;
    this.modalRef.hide();
    this.getIssues(this.selectedJiraProjectName, template);
  }
  selectAzureProject(azureProjectName: any, template: TemplateRef<void>) {

    this.selectedAzureProjectName = azureProjectName;
    this.modalRef.hide();
    this.getIssuesAzure(this.selectedAzureProjectName, template);

  }

  getIssues(projectName: string, template: TemplateRef<void>) {
    this.apiService.getProjectIssues(projectName).subscribe(value => {
      this.jiraIssues = value;
      this.openBootstrapModal(template);
    });
  }
  getIssuesAzure(projectName: string, template: TemplateRef<void>) {
    this.apiService.getWorkItems(projectName).subscribe((response: any) => {
      const responses: AzureDevOpsProject[] = [];
      if (response && response.value && response.value.length > 0) {
        response.value.forEach((issue: any) => {
          const fields = issue.fields;
          const key: string = fields['System.Id'];
          const summary: string = fields['System.Title'];
          const status: string = fields['System.State'];
          responses.push(new AzureDevOpsProject(key, summary));
        });
      }
      this.azure = responses;

      this.openBootstrapModal(template);
    });
  }

  addIssueToLocalList(issuesKey: string, issueDescription: string) {
    this.issuesRequests.push({
      description: issueDescription,
      issueKey: issuesKey,
      platformId: 'JIRA',
    } as IssuesRequest);
    this.apiService.insertUserStory(this.issuesRequests, this.sessionId).subscribe(rep => null);
    console.error(this.issuesRequests);
  }
  addIssueToLocalListAzure(issueDescription: string ) {
    this.issuesRequests.push({
      description: issueDescription,
    } as IssuesRequest);
    this.apiService.insertUserStory(this.issuesRequests, this.sessionId).subscribe(rep => null);
    console.error(this.issuesRequests);
  }
  // ************** Uplaod CSV *********************

  saveToLocalStorage(): void {
    localStorage.setItem('userStories', JSON.stringify(this.issue));
    this.apiService.save(this.iss);
  }

  fetchUserStory() {
    this.apiService.getIssues()
      .subscribe((issue) => {
        this.issue = issue;
      });
  }

  ReadExcel(event: any, sessionId: string): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workBook = XLSX.read(data, { type: 'array' });

      const sheet = workBook.Sheets[workBook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(sheet) as IssuesModel[];
      excelData.forEach((row) => {
        const description = row['description'];

        this.apiService.uploadFile(file, sessionId).subscribe(
          (response) => {
            const newUserStory = new IssuesModel();
            newUserStory.description = description;
            this.apiService.save(newUserStory);
            this.saveToLocalStorage();
            this.fetchUserStory();
          },
          (error) => {
            console.error('Upload error:', error);
          },
        );
        this.issuesRequests.push({
          description: description,
        } as IssuesModel);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  private handleOAuthCallback(): void {
    this.oauthService
      .tryLoginCodeFlow()
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          const sessionId = localStorage.getItem('sessionId'); // ou un autre moyen de récupérer sessionId
          this.router.navigate([`/pages/agile/scrum-poker-group2/session/room/${sessionId}`]);
        } else {
          console.error('Invalid access token.');
        }
      })
      .catch((error) => {
        console.error('Error during OAuth login:', error);
      });
  }

  ///////////// vote/////////////

  loadVotes(sessionId: string, issueId: string) {
    this.apiService.getVotes(sessionId, issueId).subscribe(
      (votes: VoteModel[]) => {
        this.votes = votes;
      },
      (error) => {
        console.error('Error fetching votes:', error);
      },
    );
  }

  triggerConfetti() {
    confetti();
  }
}
