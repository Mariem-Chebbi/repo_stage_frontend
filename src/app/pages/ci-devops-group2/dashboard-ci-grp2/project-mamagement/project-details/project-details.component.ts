import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectService } from '../../../../../core/services/cig2_services/project.service';
import { Project } from '../../../../../core/models/Cig2_models/project.model';


@Component({
  selector: 'ngx-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectId: string;
  project: Project;
  branches: string[] = []; // Array to store branch names
  selectedBranch: string = 'main'; // Default branch
  buildResult: any;
  sonarReport: any;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertStatus: 'success' | 'danger' = 'success';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    this.loadProjectDetails();
  }

  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe((project: Project) => {
      this.project = project;
      // Extraire gitUsername et gitRepo de gitUrl
      const { gitUsername, gitRepo } = this.extractGitUsernameAndRepo(project.gitUrl);
      this.project.gitUsername = gitUsername;
      this.project.gitRepo = gitRepo;
      // Fetch branches from GitHub
      this.fetchBranches(gitUsername, gitRepo);
    });
  }

  extractGitUsernameAndRepo(gitUrl: string): { gitUsername: string, gitRepo: string } {
    if (gitUrl.startsWith('https://github.com/')) {
      const parts = gitUrl.replace('https://github.com/', '').split('/');
      if (parts.length === 2) {
        return { gitUsername: parts[0], gitRepo: parts[1] };
      }
    }
    return { gitUsername: '', gitRepo: '' };
  }

  fetchBranches(gitUsername: string, gitRepo: string): void {
    const url = `https://api.github.com/repos/${gitUsername}/${gitRepo}/branches`;
    const headers = {
      'Authorization': `Bearer ${this.project.token}`,
      'Accept': 'application/vnd.github.v3+json'
    };

    this.http.get<{ name: string }[]>(url, { headers: headers }).subscribe(
      response => {
        this.branches = response.map(branch => branch.name);
        console.log('Branches:', this.branches);
      },
      error => {
        console.error('Error fetching branches:', error);
        this.displayAlert('Failed to fetch branches', 'danger');
      }
    );
  }

  buildProject(): void {
    if (!this.project || !this.project.gitUsername || !this.project.gitRepo) {
      console.error('Projet ou paramètres GitHub manquants');
      return;
    }

    const url = `https://api.github.com/repos/${this.project.gitUsername}/${this.project.gitRepo}/actions/workflows/back-ci.yml/dispatches`;
    const body = JSON.stringify({ ref: this.selectedBranch }); // Use the selected branch here
    const headers = {
      'Authorization': `Bearer ${this.project.token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };

    this.http.post(url, body, { headers: headers }).subscribe(
      response => {
        console.log('Workflow déclenché avec succès', response);
        this.displayAlert('Workflow déclenché avec succès', 'success');
      },
      error => {
        console.error('Erreur lors du déclenchement du workflow', error);
        this.displayAlert('Échec lors du déclenchement du workflow', 'danger');
      }
    );
  }

  displayAlert(message: string, status: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertStatus = status;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 5000);
  }
  
  viewBuildDetails(projectId: string): void {
    this.router.navigate(['/pages/agile/ci-devops-group2/view-build-details', projectId]);
  }
 showGitToken = false;
  showSonarToken = false;

  toggleShowGitToken() {
    this.showGitToken = !this.showGitToken;
  }

  toggleShowSonarToken() {
    this.showSonarToken = !this.showSonarToken;
  }

  checkCodeQuality(): void {
    this.router.navigate(['/pages/agile/ci-devops-group2/sonar-analysis', this.project.projectKey]);
  }

  StartBuild(): void {
    this.router.navigate(['/pages/agile/ci-devops-group2/stepper-build', this.project.id]);
  }



}

