import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IterationService } from '../../../../core/services/dad_services/iteration.service';

@Component({
  selector: 'ngx-edit-iteration',
  templateUrl: './edit-iteration.component.html',
  styleUrls: ['./edit-iteration.component.scss']
})
export class EditIterationComponent implements OnInit {
  iteration?: any;
  editForm: FormGroup;
  isEditingName: boolean = false;
  iterationName: string;
  statusStarted?: boolean;
  projectId?: any;

  constructor(
    private fb: FormBuilder,
    private iterationService: IterationService,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.iteration = this.windowRef.config.context['iteration'];
    this.iterationName = this.iteration.name;
    this.checkStatus();

    this.editForm = this.fb.group({
      name: [this.iteration.name, Validators.required],
      startDate: [this.convertToLocalDate(this.iteration.startDate), Validators.required],
      endDate: [this.convertToLocalDate(this.iteration.endDate), Validators.required],
    }, { validators: this.dateRangeValidator });
  }

  convertToLocalDate(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  convertToUTCDate(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  toggleEdit() {
    this.isEditingName = !this.isEditingName;
  }

  saveName() {
    this.isEditingName = false;
    this.iteration.name = this.iterationName;
    this.iterationService.edit(this.iteration).subscribe(
      (data) => {
        this.windowRef.close(data);
        this.toastrService.primary('The name edited successfully', 'Edit');
      }
    );
  }

  editIteration() {
    const updatedIteration = {
      ...this.iteration,
      ...this.editForm.value,
      startDate: this.convertToUTCDate(this.editForm.value.startDate),
      endDate: this.convertToUTCDate(this.editForm.value.endDate),
    };

    this.iterationService.edit(updatedIteration).subscribe(
      (data) => {
        this.windowRef.close(data);
        this.toastrService.primary('Iteration edited successfully', 'Edit');
      }
    );
  }

  cancelEdit() {
    this.isEditingName = false;
    this.iterationName = this.iteration.name;
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this iteration?")) {
      this.iterationService.delete(this.iteration.iterationId).subscribe(
        (data) => {
          this.toastrService.danger('Iteration deleted successfully', 'Delete');
          this.windowRef.close({ deleted: true, iterationId: this.iteration.iterationId });
        }
      )
    }
  }

  startIteration() {
    this.iterationService.startIteration(this.iteration.iterationId).subscribe(
      (data) => {
        this.checkStatus();
        this.iteration.status = 'current';  // Update the current iteration status
        this.toastrService.primary('Iteration started successfully', 'Edit');
      }
    );
  }

  finishIteration() {
    this.iterationService.finishIteration(this.iteration.iterationId).subscribe(
      (data) => {
        this.checkStatus();
        this.iteration.status = 'done';  // Update the iteration status to done
        this.toastrService.primary('Iteration finished successfully', 'Edit');
      }
    );
  }
  checkStatus() {
    this.iterationService.checkStatus(this.projectId).subscribe(
      (data) => {
        this.statusStarted = data;
      }
    );
  }
}
