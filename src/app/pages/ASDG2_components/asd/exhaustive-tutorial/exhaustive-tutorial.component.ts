import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExhaustiveTutorial } from '../../../../core/models/ExhaustiveTutorial';
import { ExhaustiveTutorialService } from '../../../../core/models/service/exhaustive-tutorial.service';


@Component({
  selector: 'app-exhaustive-tutorial',
  templateUrl: './exhaustive-tutorial.component.html',
  styleUrls: ['./exhaustive-tutorial.component.css']
})
export class ExhaustiveTutorialComponent implements OnInit {
  exhaustiveTutorialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExhaustiveTutorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExhaustiveTutorial,
    private exhaustiveTutorialService: ExhaustiveTutorialService
  ) {
    this.exhaustiveTutorialForm = this.fb.group({
      why: [data?.why || '', Validators.required],
      what: [data?.what || '', Validators.required],
      how: [data?.how || '', Validators.required],
      whatIf: [data?.whatIf || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.exhaustiveTutorialForm.valid) {
      if (this.data && this.data.id) {
        // Edit mode
        this.exhaustiveTutorialService.updateExhaustiveTutorial(this.data.id, this.exhaustiveTutorialForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Add mode
        this.exhaustiveTutorialService.addExhaustiveTutorial(this.exhaustiveTutorialForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
