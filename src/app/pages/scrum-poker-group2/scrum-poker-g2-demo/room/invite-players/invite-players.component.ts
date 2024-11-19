import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {UserModel} from '../../../../../core/models/poker_planning_grp2_models/UserModel';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrls: ['./invite-players.component.scss']})
export class InvitePlayersComponent {
  @Input() title: string;
  @Input() url: string;
  @Input() sessionId: string; // Automatically set from parent component
  email: string;
  invitedUserId: string; // New property to store the invited user's ID
  userId: string;
  user: UserModel ;
  constructor(protected ref: NbDialogRef<InvitePlayersComponent>, private apiService: ApiService,
              private toastrService: NbToastrService) {}
  confirmInvite() {
    if (confirm('Are you sure you want to invite this user?')) {
      this.sendInvitation();
    }
  }

  /*sendInvitation() {
    if (this.email && this.sessionId) {
      this.apiService.inviteUserToSession(this.sessionId, this.email).subscribe(
        () => {
          this.toastrService.danger('Invitation sent successfully', 'Success');
          this.ref.close();
        },
        (error) => {
          this.toastrService.success('Invitation sent successfully', 'Success');
        },
      );
    }
  }*/
  sendInvitation() {
    if (this.email && this.sessionId) {
      this.apiService.inviteUserToSession(this.sessionId, this.email).subscribe(
        (userId: string) => { // Handle the returned userId
          this.userId = userId; // Store the userId in the component
          this.toastrService.success('Invitation sent successfully', 'Success');
          this.ref.close();
        },
        (error) => {
          this.toastrService.success('Invitation sent successfully', 'Success');
        },
      );
    }
  }
  storeUserId(userId: string) {
    localStorage.setItem('userId', userId); // Stocke le userId dans le localStorage
  }

  cancel() {
    this.ref.close();
  }
}
