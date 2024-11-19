import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { Fmea } from '../../../core/models/LSS_models/Fmea';
import { FailureMode } from '../../../core/models/LSS_models/FailureMode';
import { ActionItem } from '../../../core/models/LSS_models/ActionItem';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss']
})
export class ActionItemComponent implements OnInit,AfterViewInit{
  fmea$: Observable<Fmea[]> = of([]);
  failureModes: FailureMode[] = [];
  actionItems: ActionItem[] = [];
  archivedActionItems:ActionItem[];
  selectedFmeaId: string | null = null;
  selectedFailureModeId: string | null = null;
  selectedCharterId:string;
  fmeas: Fmea[] = [];
  fmeaid: string;
  actionId:string;
  showAddCardForm: boolean = false;
  showArchivedCards:boolean=false;
  editingCard: ActionItem | null = null; // Track the card being edited
  showError = false;
  newCard: ActionItem = {
    title: '',
    description: '',
    id: '',
    dueDate: undefined,
    completionDate: undefined,
    status: ''
  };
  noCharterSelectedMessage: string = 'Please select a project charter to view Action items.';
  noFmeaSelectedMessage: string = 'Please select a fmea.';
  noFMSelectedMessage: string = 'Please select a failure mode.';

  noActionsMessage: string = 'No Action items found for the selected Failure mode.';
  hasActions: boolean = false;
  
  @ViewChild('Cardai', { static: false }) Cardai: ElementRef | undefined;


  scrollToAddCardForm() {
    if (this.Cardai) {
      this.Cardai.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  constructor(private service: DmadvserviceService) {}
  ngOnInit() {
    this.loadFmea();
    this.loadActionItems(this.selectedFailureModeId);
  }
  
  ngAfterViewInit(): void {
    if (this.showAddCardForm && this.Cardai) {
      this.Cardai.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
loadFmea(): void {
    this.fmea$ = this.service.selectedCharterId$.pipe(
      switchMap(charterId => {
        if (charterId) {
          this.selectedCharterId = charterId;
          return this.service.getFmeasByProjectCharterId(charterId).pipe(
            catchError(error => {
              console.error('Error fetching FMEAs:', error);
              return of([]); // Return empty array in case of error
            })
          );
        } else {
          return of([]); // Return empty array if no charter ID is selected
          this.hasActions = false;

        }
      })
    );

    this.fmea$.subscribe(data => {
      this.fmeas = data;
    });
  }

  onFmeaSelected(fmeaId: string) {
    this.selectedFmeaId = fmeaId;
    this.loadFailureModes(fmeaId);
  }

  loadFailureModes(fmeaId: string) {
    this.service.getFailureModes(fmeaId).subscribe(failureModes => {
      this.failureModes = failureModes;
      this.actionItems = []; // Reset action items when a new FMEA is selected
    });
  }
  onFailureModeSelected(failureModeId: string) {
    this.selectedFailureModeId = failureModeId;
    console.log('Selected Failure Mode ID:', failureModeId);
    this.loadActionItems(failureModeId);
  }
  
  loadActionItems(failureModeId: string | null) {
    if (failureModeId) {
      console.log('Loading action items for Failure Mode ID:', failureModeId);
      this.service.getActionItems(failureModeId).subscribe(actionItems => {
        console.log('Fetched Action Items:', actionItems);
        this.actionItems = actionItems;
        this.hasActions = actionItems.length > 0;
      });
    } else {
      console.log('No Failure Mode ID selected');
      this.actionItems = [];
      this.hasActions = false;
    }
  }
  
  toggleAddCardForm() {
    this.showAddCardForm = !this.showAddCardForm;
    if (this.showAddCardForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0);
    }
  }

  addActionItem(addform: NgForm) {
    if (this.selectedFailureModeId && this.newCard.title && this.newCard.description && this.newCard.dueDate) {
      this.newCard.id=null;
      this.newCard.completionDate=null;
      this.newCard.status='TODO';
      console.log(this.newCard)
            this.service.addActionItem(this.selectedFailureModeId,this.newCard).subscribe(
        (response) => {
          console.log('AI added successfully:', response);
          if (response) {
            this.newCard = {
              title: '',
              description: '',
              id: '',
              dueDate: undefined,
              completionDate: undefined,
              status: 'TODO'
            };
            this.showAddCardForm = false;
            this.loadActionItems(this.selectedFailureModeId);
            if (addform) {
              addform.resetForm();
            }
          }
        },
        (error) => {
          console.error('Error adding AI:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.showAddCardForm = false;
  }

  
  updateActionItem(form: NgForm) {
    if (form.valid) {
      if (this.editingCard && this.editingCard.id && this.editingCard.title && this.editingCard.description && this.editingCard.dueDate&& this.editingCard.status) {
        this.service.updateActionItem(this.editingCard.id, this.editingCard).subscribe(
          (response) => {
            this.editingCard = null; // Clear editingCard after successful update
            this.loadActionItems(this.selectedFailureModeId);
          },
          (error) => {
            console.error('Error updating AI:', error);
          }
        );
      } else {
        this.showError = true; // Display error message if fields are missing
      }
    } else {
      this.showError = true; // Display error message if form is invalid
    }
  }
  
  editCard(ai: ActionItem) {
    this.editingCard = { ...ai };
    this.showError = false;
  }

  cancelEdit() {
    this.editingCard = null;
    this.showError = false;
  }
  onArchiveButtonClick(actionItemId: string): void {
    const confirmed = confirm('Are you sure you want to archive this Action item?');
    if (confirmed) {

    this.service.archiveActionItem(actionItemId).subscribe(
      (updatedActionItem) => {
        this.loadActionItems(this.selectedFailureModeId);
        // Optionally, update the UI or notify the user
      },
      (error) => {
        console.error('Error archiving ActionItem:', error);
        // Optionally, handle the error (e.g., show a notification)
      }
    );
  }}
  UndoButtonClick(actionItemId: string): void {
   
    this.service.unarchiveActionItem(actionItemId).subscribe(
      (updatedActionItem) => {
        this.loadActionItems(this.selectedFailureModeId);
        this.loadArchivedCards(this.selectedFailureModeId);
        // Optionally, update the UI or notify the user
      },
      (error) => {
        console.error('Error unarchiving ActionItem:', error);
        // Optionally, handle the error (e.g., show a notification)
      }
    );
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'TODO':
        return 'status-todo';
      case 'INPROGRESS':
        return 'status-inprogress';
      case 'DONE':
        return 'status-done';
      default:
        return '';
    }
  }
  toggleArchivedCards() {
    this.showArchivedCards = !this.showArchivedCards;
    if (this.showArchivedCards) {
      this.loadArchivedCards(this.selectedFailureModeId); // Fetch archived cards
    }
  }
  loadArchivedCards(failureModeId: string | null) {
    if (failureModeId) {
      console.log('Loading action items for Failure Mode ID:', failureModeId);
      this.service.getArchivedActions(failureModeId).subscribe(actionItems => {
        console.log('Fetched Action Items:', actionItems);
        this.archivedActionItems = actionItems;
        this.hasActions = actionItems.length > 0;
      });
    } else {
      console.log('No Failure Mode ID selected');
      this.archivedActionItems = [];
      
    }
  }
  deleteAI(aiid: string) {
    console.log(this.selectedFailureModeId, aiid)
    const confirmed = confirm('Are you sure you want to delete this action item definetly?');
    if (confirmed) {
      const fmid = this.selectedFailureModeId;
      this.service.removeActionItem(fmid,aiid ).subscribe(
        () => {
          this.archivedActionItems = this.archivedActionItems.filter(ai => ai.id !== aiid);

        },
        (error) => {
          console.error('Error deleting', error);
        }
      );
    }
  }
  
}