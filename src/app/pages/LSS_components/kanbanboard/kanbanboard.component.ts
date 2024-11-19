import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { KanbanBoard } from '../../../core/models/LSS_models/KanbanBoard';
import { Card } from '../../../core/models/LSS_models/Card';
import { NbDateService } from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-kanbanboard',
  templateUrl: './kanbanboard.component.html',
  styleUrls: ['./kanbanboard.component.scss']
})
export class KanbanboardComponent implements OnInit,AfterViewInit {
  kanbans: KanbanBoard[] = [];
  cards: Card[] = [];
  todoCards: Card[] = [];
  inProgressCards: Card[] = [];
  doneCards: Card[] = [];
  hasKanban: boolean = false;
  noKanbanMessage: string = ''; 
  noCharterSelectedMessage: string = ''; 
  selectedCharterId$: string;
  kanbanId: string;
  editingCard: Card | null = null; // Track the card being edited
  showError = false;
 
  // New properties for adding cards
  showAddCardForm: boolean = false; 
  showAddInprogForm: boolean = false; 
  showAddDoneForm: boolean = false; 

  newCard: Card = {
    title_card: '', desciption_card: '', creation_card: undefined, priority_card: '', status: '',
    id_card: ''
  };

  @ViewChild('CardForm', { static: false }) CardForm: ElementRef | undefined;
  @ViewChild('CardinprogForm', { static: false }) CardinprogForm: ElementRef | undefined;
  @ViewChild('CardDoneForm', { static: false }) CardDoneForm: ElementRef | undefined;


  scrollToAddCardForm() {
    if (this.CardForm) {
      this.CardForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }else if(this.CardinprogForm){
      this.CardinprogForm.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start' })
    }else if(this.CardDoneForm){
      this.CardDoneForm.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }
  
  constructor(private kanbanService: SIPOCserviceService,protected dateService: NbDateService<Date>) { 

  }

  selectKanban(id:string): void {
    this.kanbanService.changeKanbanId(id);
    console.log("id kanban:",id)
  }
  ngOnInit(): void {
    this.kanbanService.selectedCharterId$.subscribe(charterId => {
      this.selectedCharterId$ = charterId;
      if (charterId) {
        this.loadKanbans(charterId);

      }
    });
    
  }
  
  ngAfterViewInit(): void {
    if (this.showAddCardForm && this.CardForm) {
      this.CardForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }else if(this.showAddInprogForm&&this.CardinprogForm){
      this.CardinprogForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }else if(this.showAddDoneForm&&this.CardDoneForm){
      this.CardDoneForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onCharterSelect(charterId: string): void {
    this.selectedCharterId$ = charterId;
    this.noCharterSelectedMessage = ''; // Clear any previous error message
    this.loadKanbans(charterId);
  } 
  
  cancelAdd() {
    this.showAddCardForm=false;
    this.showAddDoneForm=false;
    this.showAddInprogForm=false;
        this.showError = false;
      }
  
  toggleAddTODOCardForm() {
    this.showAddCardForm = !this.showAddCardForm;
    if (this.showAddCardForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0); // Delay to ensure DOM update
    }
  }
  toggleAddINPROGCardForm() {
    this.showAddInprogForm = !this.showAddInprogForm;
    if (this.showAddInprogForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0); // Delay to ensure DOM update
    }
  }
  toggleAddONECardForm() {
    this.showAddDoneForm = !this.showAddDoneForm;
    if (this.showAddDoneForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0); // Delay to ensure DOM update
    }
  }
  
  addTODOCard(addform: NgForm) {
    if (this.kanbanId && this.newCard.title_card && this.newCard.desciption_card && this.newCard.priority_card) {
      this.newCard.status = 'TODO'; // Set the status to TODO
      this.newCard.id_card = null;
      this.kanbanService.addTODOCard(this.kanbanId, this.newCard).subscribe(
        (response) => {
          console.log('Card added successfully:', response);
          if (response) {
            // Reset the new card object
            this.newCard = {
              title_card: '',
              desciption_card: '',
              creation_card: undefined,
              priority_card: '',
              status: '',
              id_card: null
            };
            this.showAddCardForm = false;
            this.loadCards(this.kanbanId);
            if (addform) {
              addform.resetForm();
            }
           
          }
        },
        (error) => {
          console.error('Error adding card:', error);
        }
      );
    }
  }
  addINPROGRESSCard(inprogressform: NgForm) {
    if (this.kanbanId && this.newCard.title_card && this.newCard.desciption_card && this.newCard.priority_card) {
      this.newCard.status = 'INPROGRESS'; 
      this.newCard.id_card = null;
      this.kanbanService.addInprogressCard(this.kanbanId, this.newCard).subscribe(
        (response) => {
          console.log('Card added successfully:', response);
          if (response) {
            // Reset the new card object
            this.newCard = {
              title_card: '',
              desciption_card: '',
              creation_card: undefined,
              priority_card: '',
              status: '',
              id_card: null
            };
            this.showAddInprogForm = false;
            this.loadCards(this.kanbanId);
            if (inprogressform) {
              inprogressform.resetForm();
            }
           
          }
        },
        (error) => {
          console.error('Error adding card:', error);
        }
      );
    }
  }
  addDONECard(doneForm: NgForm) {
    if (this.kanbanId && this.newCard.title_card && this.newCard.desciption_card  && this.newCard.priority_card) {
      this.newCard.status = 'DONE'; 
      this.newCard.id_card = null;
      this.kanbanService.addDoneCard(this.kanbanId, this.newCard).subscribe(
        (response) => {
          console.log('Card added successfully:', response);
          if (response) {
            // Reset the new card object
            this.newCard = {
              title_card: '',
              desciption_card: '',
              creation_card: undefined,
              priority_card: '',
              status: '',
              id_card: null
            };
            this.showAddDoneForm = false;
            this.loadCards(this.kanbanId);
            if (doneForm) {
              doneForm.resetForm();
            }
           
          }
        },
        (error) => {
          console.error('Error adding card:', error);
        }
      );
    }
  }
  
  loadKanbans(projectCharterId: string): void {
    this.kanbanService.getKanbanByProjectCharterId(projectCharterId).subscribe(kanbans => {
      this.kanbans = kanbans;
      if (kanbans.length > 0) {
        this.loadCards(kanbans[0].idkanban); // Load cards for the first Kanban by default
        this.kanbanId = kanbans[0].idkanban;
        this.hasKanban = true; // Set flag to true if SIPOC exists
        this.noCharterSelectedMessage = '';
        this.noKanbanMessage = ''; // Clear message if SIPOC exists
        this.selectKanban(this.kanbanId); // Move this here to ensure kanbanId is set

      } else {
        this.hasKanban = false; // Set flag to false if SIPOC does not exist
        this.noKanbanMessage = 'No Kanban available for this project charter.';
        this.noCharterSelectedMessage = '';
      }
    });
  }

  loadCards(kanbanId: string): void {
    this.kanbanService.getTodoCardsByKanbanId(kanbanId).subscribe(cards => this.todoCards = cards);
    this.kanbanService.getInprogressCardsByKanbanId(kanbanId).subscribe(cards => this.inProgressCards = cards);
    this.kanbanService.getDoneCardsByKanbanId(kanbanId).subscribe(cards => this.doneCards = cards);
  }
  updateCard(form: NgForm) {
    if (form.valid) {
      if (this.editingCard && this.editingCard.id_card && this.editingCard.title_card && this.editingCard.desciption_card && this.editingCard.priority_card && this.editingCard.status) {
        this.kanbanService.updateCard(this.editingCard.id_card, this.editingCard).subscribe(
          (response) => {
            console.log('Card updated successfully:', response);
            this.editingCard = null; // Clear editingCard after successful update
            this.showError = false;
            this.loadCards(this.kanbanId);
          },
          (error) => {
            console.error('Error updating card:', error);
          }
        );
      } else {
        this.showError = true; // Display error message if fields are missing
      }
    } else {
      this.showError = true; // Display error message if form is invalid
    }
  }
  

  editCard(card: Card) {
    this.editingCard = { ...card };
    this.showError = false;
  }

  cancelEdit() {
    this.editingCard = null;
    this.showError = false;
  }

  removeCard(cardId: string) {
    const confirmed = confirm('Are you sure you want to delete this card?');
    if (confirmed) {
      this.kanbanService.removeCard(this.kanbanId, cardId).subscribe(
        response => {
          this.loadCards(this.kanbanId);
        },
        error => {
          console.error('Error removing card:', error);
        }
      );
    }
  }
  deleteKanban() {
    const confirmed = confirm('Are you sure you want to delete this card?');
    if (confirmed) {
   
    this.kanbanService.deleteKanban(this.kanbanId).subscribe({
      next: () => {
        // Handle the successful deletion, e.g., update the UI or notify the user
        console.log('Kanban deleted successfully');
        this.loadKanbans(this.selectedCharterId$);
        
      },
      error: (err) => {
        // Handle error, e.g., show an error message
        console.error('Error deleting kanban', err);
      }
    });}
  }
  createKanban(): void {
    if (!this.selectedCharterId$) {
      this.noCharterSelectedMessage = 'Please select a Project Charter.';
      return;
    }

    this.noCharterSelectedMessage = '';

    const newKanban: KanbanBoard = {
      idkanban: '',
      id_project: this.selectedCharterId$,
      creation_date: undefined,
      title_kanban: '',
      cards: []
    };

    this.kanbanService.addKanban(this.selectedCharterId$, newKanban).subscribe(
      response => {
        console.log('New kanban created successfully:', response);
        // Optionally refresh the list or handle the response
        this.loadKanbans(this.selectedCharterId$);
      },
      error => {
        console.error('Error creating kanban:', error);
      }
    );
  }
}
