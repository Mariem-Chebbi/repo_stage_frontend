import {Component, OnInit} from '@angular/core';
import html2canvas from 'html2canvas';
// @ts-ignore
import * as jspdf from 'jspdf';
import {ActivatedRoute} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserModel} from '../../../../../core/models/poker_planning_grp2_models/UserModel';
import {IssuesModel} from '../../../../../core/models/poker_planning_grp2_models/IssuesModel';
import {VoteModel} from '../../../../../core/models/poker_planning_grp2_models/VoteModel';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']})
export class ResultComponent implements OnInit {
  sessionId: string ;
  userCount: number;
  issueCount: number;
  users: UserModel[] = [];
  issues: IssuesModel[] = [];
  votes: VoteModel[] = [];
  issueId: string;
  voteCounts: { [issueId: string]: number } = {};
  votesByIssueId: { [issueId: string]: VoteModel[] } = {}; // Store votes by issue ID

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de la session depuis l'URL
    this.getUserCount();
    this.getIssuesCount();

    this.apiService.getUsersBySession(this.sessionId).subscribe(
      (data: UserModel[]) => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      },
    );
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe(
      (data: IssuesModel[]) => {
        this.issues = data;
      },
      error => {
        console.error('Error fetching issues', error);
      },
    );
    this.apiService.getVotes(this.sessionId, this.issueId).subscribe(
      (data: VoteModel[]) => {
        this.votes = data;
      },
      error => {
        console.error('Error fetching users', error);
      },
    );
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe(
      (data: IssuesModel[]) => {
        this.issues = data;
        this.issues.forEach(issue => {
          this.apiService.getVotes(this.sessionId, issue.id).subscribe(
            (votes: VoteModel[]) => {
              // this.processVotes(issue.id, votes);
            },
            error => {
              console.error(`Error fetching votes for issue ${issue.id}`, error);
            },
          );
        });
      },
      error => {
        console.error('Error fetching issues', error);
      },
    );
    this.loadData();
  }
  loadData(): void {
    this.apiService.getIssuesBySessionId(this.sessionId).subscribe(issues => {
      this.issues = issues;
      this.loadVoteCounts();
      this.loadVotesByIssues();
    });
  }

  loadVoteCounts(): void {
    const voteCountObservables: Observable<any>[] = this.issues.map(issue =>
      this.apiService.getVoteCountByIssueId(issue.id).pipe(
        tap(count => this.voteCounts[issue.id] = count),
      ),
    );
    forkJoin(voteCountObservables).subscribe();
  }

  loadVotesByIssues(): void {
    const voteObservables: Observable<any>[] = this.issues.map(issue =>
      this.apiService.getVotesByIssueId(issue.id).pipe(
        tap(votes => this.votesByIssueId[issue.id] = votes),
      ),
    );
    forkJoin(voteObservables).subscribe();
  }


  getUserCount(): void {
    this.apiService.countUsersInSession(this.sessionId).subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre des utilisateurs:', error);
      },
    );
  }
  getIssuesCount(): void {
    this.apiService.countIssuesInSession(this.sessionId).subscribe(
      (count: number) => {
        this.issueCount = count;
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre des issues:', error);
      },
    );
  }
  /*constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);

  }*/

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  downloadAsPDF(): void {
    const element = document.getElementById('pdfContent');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'px', [canvas.width, canvas.height]);

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('download.pdf');
    });
  }
}
