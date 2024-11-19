import { Component } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-voting-history',
  templateUrl: './voting-history.component.html',
  styleUrls: ['./voting-history.component.scss']})
export class VotingHistoryComponent {
  constructor(
    protected ref: NbDialogRef<VotingHistoryComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) {}
  isOpen = false;
  votingHistory = [
  ];

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.ref.close();
  }
}
