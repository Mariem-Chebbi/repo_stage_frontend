import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {SessionModel, VotingSystem} from '../../../../core/models/poker_planning_grp2_models/SessionModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']})
export class SessionComponent implements OnInit {
  addSessionForm: FormGroup;
  votingSystems = Object.keys(VotingSystem).map(key => ({
    value: key,
    description: VotingSystem[key],
  }));

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastrService: NbToastrService,
    private router: Router,
    private dialogService: NbDialogService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.addSessionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      votingSystem: [VotingSystem.FIBONACCI, Validators.required],
      cards: [this.getCardsForSystem(VotingSystem.FIBONACCI)],
    });
  }

  onVotingSystemChange(systemValue: string) {
    const selectedSystem = VotingSystem[systemValue as keyof typeof VotingSystem];
    const cards = this.getCardsForSystem(selectedSystem);
    this.addSessionForm.patchValue({ cards });
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

  confirmAdd() {
    if (this.addSessionForm.valid) {
      if (confirm('Are you sure you want to start a new session?')) {
        this.addSession();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addSession() {
    const newSession: SessionModel = this.addSessionForm.value;
    this.apiService.addSession(newSession).subscribe(
      (session) => {
        this.toastrService.success('Session started successfully', 'Success');
        this.addSessionForm.reset();
        this.router.navigate(['/pages/agile/scrum-poker-group2/session/room', session.id]);
        // this.openUserPseudo(session.id);
      },
      (error) => {
        console.error('Error starting the session:', error);
        this.toastrService.danger('Failed to add the session', 'Error');
      },
    );
  }
/*  openUserPseudo() {
    this.dialogService.open(UserPseudoComponent, {
      context: {
        name: 'player name',
      },
    });
  }*/


}
