import { Component, OnInit, Inject } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Introduction } from '../../../../core/models/Introduction';
import { IntroductionService } from '../../../../core/models/service/introduction.service';


@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  introductionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<IntroductionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Introduction,
    private introductionService: IntroductionService
  ) {
    this.introductionForm = this.fb.group({
      origins: [data?.origins || '', Validators.required],
      methodology: [data?.methodology || '', Validators.required],
      impact: [data?.impact || '', Validators.required],
      collaboration: this.fb.array(this.initArray(data?.collaboration || []), Validators.required),
      speculations: this.fb.array(this.initArray(data?.speculations || []), Validators.required),
      learning: this.fb.array(this.initArray(data?.learning || []), Validators.required),
    });
  }
  
  initArray(items: string[]): FormControl[] {
    return items.map(item => this.fb.control(item, Validators.required));
  }

  ngOnInit(): void {}

  get collaboration(): FormArray {
    return this.introductionForm.get('collaboration') as FormArray;
  }

  get speculations(): FormArray {
    return this.introductionForm.get('speculations') as FormArray;
  }

  get learning(): FormArray {
    return this.introductionForm.get('learning') as FormArray;
  }

  addCollaborationItem(): void {
    this.collaboration.push(this.fb.control('', Validators.required));
  }

  addSpeculationItem(): void {
    this.speculations.push(this.fb.control('', Validators.required));
  }

  addLearningItem(): void {
    this.learning.push(this.fb.control('', Validators.required));
  }

  removeCollaborationItem(index: number): void {
    this.collaboration.removeAt(index);
  }

  removeSpeculationItem(index: number): void {
    this.speculations.removeAt(index);
  }

  removeLearningItem(index: number): void {
    this.learning.removeAt(index);
  }

  save(): void {
    if (this.introductionForm.valid) {
      if (this.data && this.data.id) {
        // Edit mode
        this.introductionService.updateIntroduction(this.data.id, this.introductionForm.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error updating introduction:', err);
          }
        });
      } else {
        // Add mode
        this.introductionService.addIntroduction(this.introductionForm.value).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error adding introduction:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
  
  

  close(): void {
    this.dialogRef.close();
  }
}
