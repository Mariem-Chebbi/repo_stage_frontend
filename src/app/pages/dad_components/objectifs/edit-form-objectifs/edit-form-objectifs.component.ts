import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { ObjectiveService } from '../../../../core/services/dad_services/objective.service';

@Component({
  selector: 'ngx-edit-form-objectifs',
  templateUrl: './edit-form-objectifs.component.html',
  styleUrls: ['./edit-form-objectifs.component.scss']
})
export class EditFormObjectifsComponent implements OnInit {
  editForm: FormGroup;
  objective?: any;
  positions = NbGlobalPhysicalPosition;

  constructor(
    private objectiveService: ObjectiveService,
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.objective = this.windowRef.config.context['objective'];

    this.editForm = this.fb.group({
      description: [this.objective.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedObjective = { ...this.objective, ...this.editForm.value };
      this.objectiveService.edit(updatedObjective).subscribe(
        (data) => {
          console.log("success");
          this.showToast(this.positions.BOTTOM_LEFT, 'warning')
          this.windowRef.close(data);
        }
      );
    }
  }

  onAchieve() {
    this.objective.isAchieved = true;
    this.objectiveService.edit(this.objective).subscribe(
      (data) => {
        console.log("success");
        this.showToast(this.positions.BOTTOM_LEFT, 'info')
        this.windowRef.close(data);
      }
    );
  }

  onNotAchieved() {
    this.objective.isAchieved = false;
    this.objectiveService.edit(this.objective).subscribe(
      (data) => {
        console.log("success");
        this.showToast(this.positions.BOTTOM_LEFT, 'info')
        this.windowRef.close(data);
      }
    );
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this objective?")) {
      this.objectiveService.archive(this.objective.objectiveId).subscribe(
        (data) => {
          console.log("Objective deleted successfully");
          this.toastrService.danger('Objective deleted successfully', 'Delete');
          this.windowRef.close({ deleted: true, objectiveId: this.objective.objectiveId });
        }
      );
    }
  }

  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Objectif`, { position, status });
  }
}
