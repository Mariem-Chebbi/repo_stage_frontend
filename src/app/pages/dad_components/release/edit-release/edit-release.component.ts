import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { ReleaseService } from '../../../../core/services/dad_services/release.service';

@Component({
  selector: 'ngx-edit-release',
  templateUrl: './edit-release.component.html',
  styleUrls: ['./edit-release.component.scss']
})
export class EditReleaseComponent implements OnInit {
  editForm: FormGroup;
  projectId?: any;
  release?: any;

  constructor(
    private fb: FormBuilder,
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private releaseService: ReleaseService
  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.release = this.windowRef.config.context['release'];

    this.editForm = this.fb.group({
      name: [this.release.name, Validators.required],
      startDate: [this.release.startDate, Validators.required],
      releaseDate: [this.release.releaseDate, Validators.required],
      description: [this.release.description, Validators.required],
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
    if (this.editForm.valid) {

      const updatedRelease = {
        ...this.release,
        ...this.editForm.value,

      };

      this.releaseService.edit(updatedRelease).subscribe(
        (data) => {
          this.windowRef.close(data);
          this.toastrService.success('The release has been successfully updated.', 'Success');
        },
        (error) => {
          console.error('Error editing release', error);
          this.toastrService.danger('Failed to update the release. Please try again.', 'Error');
        }
      );
    }
  }


  onCancel() {
    this.windowRef.close();
  }

}
