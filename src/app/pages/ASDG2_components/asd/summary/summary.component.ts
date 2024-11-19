import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Summary } from '../../../../core/models/Summary';
import { SummaryService } from '../../../../core/models/service/summary.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  summaryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Summary,
    private summaryService: SummaryService
  ) {
    this.summaryForm = this.fb.group({
      introduction: [data?.introduction || '', Validators.required],
      corePrinciples: [data?.corePrinciples || '', Validators.required],
      keyProcesses: [data?.keyProcesses || '', Validators.required],
      advantagesLimitations: [data?.advantagesLimitations || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.summaryForm.valid) {
      if (this.data && this.data.id) {
        // Edit mode
        this.summaryService.updateSummary(this.data.id, this.summaryForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Add mode
        this.summaryService.addSummary(this.summaryForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
