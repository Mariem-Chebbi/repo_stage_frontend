import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NbToastrService } from '@nebular/theme';


import { Project } from '../../../../../core/models/Cig2_models/project.model';
import { ProjectService } from '../../../../../core/services/cig2_services/project.service';


@Component({
  selector: 'ngx-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  editProjectForm: FormGroup;
  projectId: string;
  hideToken = true; // Initial state to hide token
  hideSonarToken = true; // Initial state to hide SonarCloud token
  updateStatus: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private toastrService: NbToastrService

  ) {
    this.editProjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      gitUrl: ['', [Validators.required]],
      token: ['', Validators.required],
      projectKey: ['', Validators.required],
      sonarToken: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    console.log('Project ID:', this.projectId);
    this.loadProjectDetails();
  }

  loadProjectDetails(): void {
    this.projectService.getProjectById(this.projectId).subscribe((project: Project) => {
      console.log('Project data retrieved:', project); // Log project data
      this.editProjectForm.patchValue({
        name: project.name,
        description: project.description,
        gitUrl: project.gitUrl,
        token: project.token,
        projectKey: project.projectKey,
        sonarToken: project.sonarToken,
      });
      console.log('Form values after patching:', this.editProjectForm.value); // Log form values
    });
  }

  toggleTokenVisibility(): void {
    this.hideToken = !this.hideToken;
  }
  toggleSonarTokenVisibility(): void {
    this.hideSonarToken = !this.hideSonarToken;
  }

  onSubmit(): void {
    if (this.editProjectForm.valid) {
      const formValue = this.editProjectForm.value;
      const project = {
        ...formValue,
        ...this.extractGitUsernameAndRepo(formValue.gitUrl) // Extract gitUsername and gitRepo
      };

      this.projectService.updateProject(this.projectId, project).subscribe(
        response => {
          console.log('Projet mis à jour avec succès', response);
          this.toastrService.success('Projet mis à jour avec succès', 'Succès');
          // this.router.navigate(['/pages/agile/ci-devops-group2/project-management']);
        },
        error => {
          console.error('Erreur lors de la mise à jour du projet', error);
          this.toastrService.danger('Erreur lors de la mise à jour du projet', 'Erreur');
        }
      );
    }
  }
  retern(): void {
          this.router.navigate(['/pages/agile/ci-devops-group2/project-management']);
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
