// create-asd-step.component.ts
import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { ASDStepService } from '../../../../core/models/service/asdstep.service';
import { ASDStep } from '../../../../core/models/ASDStep';

@Component({
  selector: 'ngx-create-asd-step',
  templateUrl: './create-asdstep.component.html',
  styleUrls: ['./create-asdstep.component.scss']
})
export class CreateASDStepComponent {
  newASDStep: ASDStep = new ASDStep();

  constructor(
    private ASDStepService: ASDStepService,
    public dialogRef: MatDialogRef<CreateASDStepComponent>
  ) {}

  onCreate(): void {
    this.ASDStepService.createASDStep(this.newASDStep).subscribe(
      response => {
        this.dialogRef.close(response);
      },
      error => {
        console.error('Error creating ASD step:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
