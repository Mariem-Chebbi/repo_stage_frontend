import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ReleaseService } from '../../../../core/services/dad_services/release.service';

@Component({
  selector: 'ngx-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.scss']
})
export class AddReleaseComponent implements OnInit {
  addForm: FormGroup;
  projectId?: any;

  constructor(
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private releaseService: ReleaseService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];

    this.addForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
    }, { validators: this.dateRangeValidator });
  }

  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const releaseDate = control.get('releaseDate')?.value;

    if (startDate && releaseDate && new Date(startDate) > new Date(releaseDate)) {
      return { dateRangeInvalid: true };
    }
    return null;
  }


  onSubmit() {
    if (this.addForm.valid) {
      // Process the form data here
      const newRelease = this.addForm.value;
      newRelease.status = "Unreleased";
      console.log('New Release:', newRelease);


      this.releaseService.add(newRelease, this.projectId).subscribe(
        (data) => {
          this.windowRef.close(data);
        },
        (error) => {
          this.toastrService.danger('Please correct the errors in the form.', 'Form Submission');
        }
      );

    }
  }

  onCancel() {
    this.windowRef.close();
  }
}
