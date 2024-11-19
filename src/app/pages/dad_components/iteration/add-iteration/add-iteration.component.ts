import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { IterationService } from '../../../../core/services/dad_services/iteration.service';

@Component({
  selector: 'ngx-add-iteration',
  templateUrl: './add-iteration.component.html',
  styleUrls: ['./add-iteration.component.scss']
})
export class AddIterationComponent implements OnInit {
  addForm: FormGroup;
  projectId?: any;
  positions = NbGlobalPhysicalPosition;

  constructor(
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private iterationService: IterationService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    }, { validators: this.dateRangeValidator });
  }

  // Convert backend date to local date for proper display
  convertToLocalDate(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // Convert the date to UTC before sending it to the backend
  convertToUTCDate(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  onSubmit() {
    /* const iteration = this.addForm.value;

    // Ensure the dates are in ISO format (yyyy-mm-dd)
    iteration.startDate = new Date(iteration.startDate).toISOString().split('T')[0];
    iteration.endDate = new Date(iteration.endDate).toISOString().split('T')[0]; */

    const updatedIteration = {
      ...this.addForm.value,
      startDate: this.convertToUTCDate(this.addForm.value.startDate),
      endDate: this.convertToUTCDate(this.addForm.value.endDate),
    };

    this.iterationService.add(updatedIteration, this.projectId).subscribe(
      (data) => {
        console.log("success");
        this.showToast(this.positions.BOTTOM_LEFT, 'success');
        this.windowRef.close(data);
      }
    );
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }


  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Objectif`, { position, status });
  }


}
