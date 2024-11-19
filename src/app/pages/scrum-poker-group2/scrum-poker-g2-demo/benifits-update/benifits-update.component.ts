import { Component, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {BenefitsModel} from '../../../../core/models/poker_planning_grp2_models/BenefitsModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-benefits-update',
  templateUrl: './benifits-update.component.html',
  styleUrls: ['./benifits-update.component.scss'],
})
export class BenifitsUpdateComponent {
  @Input() title: string;
  @Input() benefit: BenefitsModel;

  constructor(
    protected ref: NbDialogRef<BenifitsUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Are you sure you want to update this benefit?')) {
      this.updateBenefit();
    }
  }

  updateBenefit() {
    this.apiService.updateBenifits(this.benefit.id, this.benefit).subscribe(
      () => {
        this.toastrService.success('Benefit updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the benefit:', error);
        this.toastrService.danger('Failed to update the benefit', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
