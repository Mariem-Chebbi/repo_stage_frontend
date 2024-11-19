import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../../../../core/FDDG2_Services/project-service.service';
import { Project } from '../project-class/models/project';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'ngx-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit {
  windowRef: NbWindowRef;
  
  projects: Project[] = [];
  filteredprojects: Project[] = [];
  searchQuery: string = '';
  codeproject: string = "";
  codeWs: string;
  constructor(private ProjectService : ProjectServiceService, private router: Router,private route: ActivatedRoute, private windowService: NbWindowService) { }

  ngOnInit(): void {
    this.codeWs = this.route.snapshot.paramMap.get('id');
    console.log(this.codeWs);
    this.fetchproject()
  }

  fetchproject(): void {
    this.ProjectService.getWSProjects(this.codeWs).subscribe({
      next: (projects) => { this.projects = projects; },
      error: (error) => {
        console.error(error)
      }
    })
  }
  navigateToDetails(codeWS: string): void {
    this.router.navigate(['/pages/agile/project/details-Project', this.codeproject])
  }
  navigateToAddProject() {
    this.router.navigate(['/pages/agile/project/addProject/',this.codeWs]);
    console.log("ok");
  }selectedProject: Project | null = null;
  onProjectSelect(project: Project): void {
    this.selectedProject = project;
    console.log(this.selectedProject.codeProject)
  }

  navigateToFeatures(): void {
    if (this.selectedProject) {
      this.router.navigate(['/pages/agile/features/', this.selectedProject.codeProject]);
    } else {
      console.error('No workspace selected.');
    }
  }
  openWindowForm(): void {
    this.ProjectService.setWorkspaceId(this.codeWs); // Set the workspace ID in the service
    this.windowRef = this.windowService.open(AddProjectComponent, { title: `Create New Project` });
  }

  navigateToAllProjects() {
    this.router.navigate(['/pages/agile/project/getAllProjects']);
    console.log("ok");
  }
  closeWindowForm() {
    if (this.windowRef) {
      this.windowRef.close();
      this.navigateToAllProjects();
    }
  }

}
