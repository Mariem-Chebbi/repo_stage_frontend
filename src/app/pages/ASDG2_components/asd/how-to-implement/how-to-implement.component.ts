import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HowToImplement } from '../../../../core/models/HowToImplement';
import { HowToImplementService } from '../../../../core/models/service/how-to-implement.service';

@Component({
  selector: 'app-how-to-implement',
  templateUrl: './how-to-implement.component.html',
  styleUrls: ['./how-to-implement.component.css']
})
export class HowToImplementComponent implements OnInit {
  howToImplementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HowToImplementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HowToImplement,
    private howToImplementService: HowToImplementService
  ) {
    this.howToImplementForm = this.fb.group({
      stepManagement: [data?.stepManagement || '', Validators.required],
      iterationPlanning: [data?.iterationPlanning || '', Validators.required],
      changeManagementForms: [data?.changeManagementForms || '', Validators.required],
      continuousEvaluation: [data?.continuousEvaluation || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.howToImplementForm.valid) {
      if (this.data && this.data.id) {
        // Edit mode
        this.howToImplementService.updateHowToImplement(this.data.id, this.howToImplementForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Add mode
        this.howToImplementService.addHowToImplement(this.howToImplementForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
