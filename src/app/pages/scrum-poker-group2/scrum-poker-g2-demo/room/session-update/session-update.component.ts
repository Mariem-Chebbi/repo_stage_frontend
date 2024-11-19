import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionModel, VotingSystem} from '../../../../../core/models/poker_planning_grp2_models/SessionModel';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-session-update',
  templateUrl: './session-update.component.html',
  styleUrls: ['./session-update.component.scss']})
export class SessionUpdateComponent implements OnInit {
  @Input() title: string;
  @Input() session: SessionModel;
  updateSessionForm: FormGroup;
  votingSystems = Object.keys(VotingSystem).map(key => ({
    value: key,
    description: VotingSystem[key],
  }));


  constructor(
    protected ref: NbDialogRef<SessionUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.updateSessionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      votingSystem: [VotingSystem.FIBONACCI, Validators.required],
      cards: [this.getCardsForSystem(VotingSystem.FIBONACCI)],
    });
  }
  confirmUpdate() {
    if (confirm('Are you sure you want to update this session?')) {
      this.updateSession();
    }
  }

  updateSession() {
    this.apiService.updateSession(this.session.id, this.session).subscribe(
      () => {
        this.toastrService.success('session updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the session:', error);
        this.toastrService.danger('Failed to update the session', 'Error');
      },
    );
  }
  onVotingSystemChange(systemValue: string) {
    const selectedSystem = VotingSystem[systemValue as keyof typeof VotingSystem];
    const cards = this.getCardsForSystem(selectedSystem);
    this.updateSessionForm.patchValue({ cards });
  }
  getCardsForSystem(system: VotingSystem): string[] {
    switch (system) {
      case VotingSystem.FIBONACCI:
        return [' ☕', '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];
      case VotingSystem.MODIFIED_FIBONACCI:
        return [' ☕', '0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
      case VotingSystem.TSHIRTS:
        return [' ☕', 'XS', 'S', 'M', 'L', 'XL'];
      case VotingSystem.POWERS_OF_2:
        return [' ☕', '0', '1', '2', '4', '8', '16', '32', '64'];
      default:
        return [];
    }
  }

  cancel() {
    this.ref.close();
  }
}
