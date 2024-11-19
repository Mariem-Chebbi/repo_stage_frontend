import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { TeamService } from '../../../../core/services/dad_services/team.service';

@Component({
  selector: 'ngx-create-team-form',
  templateUrl: './create-team-form.component.html',
  styleUrls: ['./create-team-form.component.scss']
})
export class CreateTeamFormComponent {
  addForm: FormGroup;
  projectId?: string;
  positions = NbGlobalPhysicalPosition;


  constructor(
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.addForm = this.fb.group({
      teamName: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  createTeam() {
    if (this.addForm.valid) {
      const obj = this.addForm.value;
      this.teamService.add(obj, this.projectId).subscribe(
        (data) => {
          //console.log("success");
          this.showToast(this.positions.BOTTOM_LEFT, 'success')
          this.windowRef.close(data); // Pass the new objective data back to the parent component
        }
      )
    }
  }

  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Team`, { position, status });
  }
}
