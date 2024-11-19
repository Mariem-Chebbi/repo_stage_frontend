import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Workspace } from '../../../../../core/FDDG2_Models/workspace';
import { WorkspaceService } from '../../../../../core/FDDG2_Services/workspace.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { NbTreeGridDataSourceBuilder, NbWindowRef, NbWindowService } from '@nebular/theme';
import { AddWorkSpaceComponent } from '../add-work-space/add-work-space.component';
import { User } from '../../../../../core/FDDG2_Models/user';
import { AuthService } from '../../../../../core/FDDG2_Services/auth.service';

@Component({
  selector: 'ngx-list-work-space',
  templateUrl: './list-work-space.component.html',
  styleUrls: ['./list-work-space.component.scss']
})
export class ListWorkSpaceComponent implements OnInit {
  windowRef: NbWindowRef;
  selectedWorkspace: Workspace | null = null;
  workspaces: Workspace[] = [];
  filteredWorkSpaces: Workspace[] = [];
  searchQuery: string = '';
  codeWS: string = '';
  user: any;

  constructor(private workspaceservice: WorkspaceService, private router: Router, private windowService: NbWindowService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
    console.log(this.user);
    this.fetchWorkspace()
    
  }

  fetchWorkspace(): void {
    this.workspaceservice.getUserWorkSpace(this.user.id).subscribe(
      (workspaces) => {
        this.workspaces = workspaces;
      },
      (error) => {
        console.error('Error fetching workspaces:', error);
      }
    );
  }
  onWorkspaceSelect(workspace: Workspace): void {
    this.selectedWorkspace = workspace;
    console.log(this.selectedWorkspace.codeWS)
  }

  navigateToProjects(): void {
    if (this.selectedWorkspace) {
      this.router.navigate(['/pages/agile/project/getAllProjects/', this.selectedWorkspace.codeWS]);
    } else {
      console.error('No workspace selected.');
    }
  }
  navigateToAddWorkSpace() {
    this.router.navigate(['/pages/agile/workspace/addWS/',]);
    console.log("ok");
  }


  openWindowForm() {
    this.windowRef = this.windowService.open(AddWorkSpaceComponent, { title: `Create New WorkSpace` });
  }
  navigateToAllWorkSpace() {
    this.router.navigate(['/pages/agile/workspace/getAllWS']);
    console.log("ok");
  }
  closeWindowForm() {
    if (this.windowRef) {
      this.windowRef.close();
      this.navigateToAllWorkSpace();
    }
  }
}
