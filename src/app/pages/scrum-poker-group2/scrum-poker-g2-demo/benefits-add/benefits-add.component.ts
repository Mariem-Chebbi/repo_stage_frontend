import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {BenefitsModel} from '../../../../core/models/poker_planning_grp2_models/BenefitsModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-benefits-add',
  templateUrl: './benefits-add.component.html',
  styleUrls: ['./benefits-add.component.scss'],
})
export class BenefitsAddComponent implements OnInit {
  addBenefitForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<BenefitsAddComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.addBenefitForm = this.fb.group({
      title: ['', Validators.required],
      benefDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addBenefitForm.valid) {
      if (confirm('Are you sure you want to add this benefit?')) {
        this.addBenefit();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addBenefit() {
    const newBenefit: BenefitsModel = this.addBenefitForm.value;
    this.apiService.addBenefit(newBenefit).subscribe(
      (benefit) => {
        this.toastrService.success('Benefit added successfully', 'Success');
        this.ref.close(benefit);
      },
      (error) => {
        console.error('Error adding the benefit:', error);
        this.toastrService.danger('Failed to add the benefit', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
