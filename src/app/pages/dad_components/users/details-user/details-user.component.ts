import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { UserService } from '../../../../core/services/dad_services/user.service';

@Component({
  selector: 'ngx-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent {
  editForm: FormGroup;
  positions = NbGlobalPhysicalPosition;
  collaboration?: any;
  projectId?: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.collaboration = this.windowRef.config.context['collaboration'];
    this.projectId = this.windowRef.config.context['projectId'];

    this.editForm = this.fb.group({
      role: [this.collaboration.user.role, Validators.required],
    });
  }


  onRoleChange() {
    this.userService.assignUserToTeam(this.collaboration.user.email, this.projectId, this.collaboration.role)
      .subscribe(
        (data) => {
          this.showToast(this.positions.BOTTOM_LEFT, 'success')
          this.windowRef.close(data);
        }
      )
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this member?")) {
      this.userService.delete(this.collaboration.collaborationId).subscribe(
        (data) => {
          this.toastrService.danger('Member deleted successfully', 'Delete');
          this.windowRef.close({ deleted: true, collaborationId: this.collaboration.collaborationId });
        }
      )
    }
  }

  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Team`, { position, status });
  }


}
