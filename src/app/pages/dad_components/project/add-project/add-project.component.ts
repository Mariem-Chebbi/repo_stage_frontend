import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../../../core/services/dad_services/project.service';

@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  project: any = {};

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      projectName: [this.project.projectName, Validators.required],
      description: [this.project.description, Validators.required],
      endDate: [this.project.endDate, Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  submit() {
    const formValue = this.firstForm.value;

    // Vérifiez si formValue.endDate est défini et contient start
    if (formValue.endDate && formValue.endDate.start) {
      const formattedEndDate = this.datePipe.transform(formValue.endDate.start, 'yyyy-MM-dd');
      const payload = {
        ...formValue,
        endDate: formattedEndDate
      };
      console.log(payload)

      // Assurez-vous que la date est correctement formatée dans le payload
      this.project = { ...this.firstForm.value, endDate: formattedEndDate };
      console.log(this.project);
      this.projectService.add(this.project).subscribe(
        (data) => {
          console.log("success")
        }
      )
    }
  }

}
