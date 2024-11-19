import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { AddFormUserComponent } from '../add-form-user/add-form-user.component';
import { CreateTeamFormComponent } from '../create-team-form/create-team-form.component';
import { DetailsUserComponent } from '../details-user/details-user.component';
import { UserService } from '../../../../core/services/dad_services/user.service';
import { TeamService } from '../../../../core/services/dad_services/team.service';

@Component({
  selector: 'ngx-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  userList?: any[] = []
  users: { name: string, title: string }[]
  projectId?: string;
  team?: any;

  constructor(
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private userService: UserService,
    private teamService: TeamService

  ) {
    /*     this.users = [
          { name: 'Carla Espinosa', title: 'Nurse' },
          { name: 'Bob Kelso', title: 'Doctor of Medicine' },
          { name: 'Janitor', title: 'Janitor' },
          { name: 'Perry Cox', title: 'Doctor of Medicine' },
          { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
        ]; */

    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });

  }

  ngOnInit(): void {
    this.listUsers();
    this.getTeam();
  }

  listUsers() {
    this.userService.getusers(this.projectId).subscribe(
      (data) => {
        this.userList = data
        console.log(this.userList);
      }
    )
  }

  getTeam() {
    this.teamService.get(this.projectId).subscribe(
      (data) => {
        this.team = data
        console.log(this.team)
      }
    )
  }

  openWindowAdd() {
    const windowRef = this.windowService.open(AddFormUserComponent, {
      title: 'Add member to the team',
      context: {
        projectId: this.projectId,
      },
    });

    windowRef.onClose.subscribe((data: { collaborationId: string; role: string; team: any; user: any }) => {
      if (data) {
        // Check if the collaboration already exists in the list by collaborationId
        const existingCollaborationIndex = this.userList.findIndex(collab => collab.collaborationId === data.collaborationId);

        if (existingCollaborationIndex !== -1) {
          // Update the existing collaboration in the list
          this.userList[existingCollaborationIndex] = data;
          console.log('Collaboration updated:', data);
        } else {
          // Add the new collaboration to the list
          this.userList.push(data);
          console.log('New collaboration added:', data);
        }
      }
    });
  }



  openWindowCreateTeam() {
    const windowRef = this.windowService.open(CreateTeamFormComponent, {
      title: 'Create Team',
      context: {
        projectId: this.projectId,
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data) {
        this.team = data; // Update the list of objectives with the new data
      }
    });

  }

  openWindowDetailsUser(collab) {
    const windowRef = this.windowService.open(DetailsUserComponent, {
      title: 'User details',
      context: {
        projectId: this.projectId,
        collaboration: collab
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data.deleted) {
        this.userList = this.userList.filter(obj => obj.collaborationId !== data.collaborationId);
      } else {
        this.listUsers();
      }
    });

  }
}
