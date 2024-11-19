import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { UserService } from '../../../../core/services/dad_services/user.service';

@Component({
  selector: 'ngx-add-form-user',
  templateUrl: './add-form-user.component.html',
  styleUrls: ['./add-form-user.component.scss']
})
export class AddFormUserComponent implements OnInit {
  addForm: FormGroup;
  projectId?: string;
  positions = NbGlobalPhysicalPosition;

  constructor(
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.addForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }

  assignUser() {
    console.log(this.addForm.value.email)
    this.userService.assignUserToTeam(this.addForm.value.email, this.projectId, this.addForm.value.role)
      .subscribe(
        (data) => {
          this.showToast(this.positions.BOTTOM_LEFT, 'success')
          this.windowRef.close(data);
        }
      )
  }

  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Team`, { position, status });
  }




}
