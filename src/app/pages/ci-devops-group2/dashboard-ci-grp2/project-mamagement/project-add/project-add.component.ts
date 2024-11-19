import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ProjectService } from '../../../../../core/services/cig2_services/project.service';

@Component({
  selector: 'ngx-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  projectForm: FormGroup;
  hideToken = true;
  hideSonarToken = true; 

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      gitUrl: ['', Validators.required],
      token: ['', Validators.required],
      projectKey: ['', Validators.required],
      sonarToken: ['', Validators.required],
    });
  }

  toggleTokenVisibility(): void {
    this.hideToken = !this.hideToken;
  }

  toggleSonarTokenVisibility(): void { // Add this method
    this.hideSonarToken = !this.hideSonarToken;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      const project = {
        ...formValue,
        ...this.extractGitUsernameAndRepo(formValue.gitUrl) // Extraire gitUsername et gitRepo
      };

      this.projectService.addProject(project).subscribe(() => {
        this.router.navigate(['/pages/agile/ci-devops-group2/project-management']);
      });
    }
  }

  private extractGitUsernameAndRepo(gitUrl: string): { gitUsername: string, gitRepo: string } {
    if (gitUrl.startsWith('https://github.com/')) {
      const parts = gitUrl.replace('https://github.com/', '').split('/');
      if (parts.length === 2) {
        return { gitUsername: parts[0], gitRepo: parts[1] };
      }
    }
    return { gitUsername: '', gitRepo: '' };
  }
}
