import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {StepsModel} from '../../../../../core/models/poker_planning_grp2_models/stepsModel';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';
@Component({
  selector: 'ngx-steps-update',
  templateUrl: './steps-update.component.html',
  styleUrls: ['./steps-update.component.scss']})
export class StepsUpdateComponent  {
  @Input() title: string;
  @Input() step: StepsModel;

  constructor(
    protected ref: NbDialogRef<StepsUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}



  confirmUpdate() {
    if (confirm('Are you sure you want to update this step ?')) {
      this.updateSteps();
    }
  }

  updateSteps() {
      this.apiService.updateStep(this.step.id, this.step).subscribe(
        () => {
          this.toastrService.success('step updated successfully', 'Success');
          this.ref.close();
        },
        (error) => {
          console.error('Error updating the step:', error);
          this.toastrService.danger('Failed to update the step', 'Error');
        },
      );
    }


  cancel() {
    this.ref.close();
  }
}


