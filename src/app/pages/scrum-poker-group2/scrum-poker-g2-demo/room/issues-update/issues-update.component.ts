import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {IssuesModel} from '../../../../../core/models/poker_planning_grp2_models/IssuesModel';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-issues-update',
  templateUrl: './issues-update.component.html',
  styleUrls: ['./issues-update.component.scss']})
export class IssuesUpdateComponent {
  @Input() title: string;
  @Input() issue: IssuesModel;

  constructor(
    protected ref: NbDialogRef<IssuesUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}

  confirmUpdate() {
    if (confirm('Are you sure you want to update this issue?')) {
      this.updateIssue();
    }
  }

  updateIssue() {
    this.apiService.updateIssue(this.issue.id, this.issue).subscribe(
      () => {
        this.toastrService.success('issue updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the issue:', error);
        this.toastrService.danger('Failed to update the issue', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }
}
