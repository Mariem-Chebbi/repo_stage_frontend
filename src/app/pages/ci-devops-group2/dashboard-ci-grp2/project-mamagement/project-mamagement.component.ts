import { Component, OnInit } from '@angular/core';

import { NbDialogService, NbDialogRef } from '@nebular/theme';

import { ProjectService } from '../../../../core/services/cig2_services/project.service';
import { Project } from '../../../../core/models/Cig2_models/project.model';

@Component({
  selector: 'ngx-project-mamagement',
  templateUrl: './project-mamagement.component.html',
  styleUrls: ['./project-mamagement.component.scss']
})
export class ProjectMamagementComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private dialogService: NbDialogService // Inject Nebular Dialog Service
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects', error);
      }
    );
  }

  viewProjectDetails(project: Project): void {
    // Logic to navigate to project details
  }

  openEditModal(project: Project): void {
    // Logic to open the edit modal
  }

  
  confirmDeleteProject(project: Project): void {
    const confirmation = window.confirm(`Are you sure you want to delete the project "${project.name}"?`);
    if (confirmation) {
      this.projectService.deleteProject(project.id).subscribe(
        () => {
          // Remove the deleted project from the list
          this.projects = this.projects.filter(p => p.id !== project.id);
          console.log('Project deleted successfully');
        },
        (error) => {
          console.error('Error deleting project', error);
        }
      );
    }
  }
}