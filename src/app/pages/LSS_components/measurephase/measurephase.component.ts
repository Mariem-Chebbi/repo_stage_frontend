import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Fmea } from '../../../core/models/LSS_models/Fmea';
import { FailureMode } from '../../../core/models/LSS_models/FailureMode';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-measurephase',
  templateUrl: './measurephase.component.html',
  styleUrls: ['./measurephase.component.scss']
})
export class MeasurephaseComponent implements OnInit, AfterViewInit {
  fmeas: Fmea[] = [];
  selectedFmea: Fmea | null = null;
  failureModes: FailureMode[] = [];
  fmea$: Observable<Fmea[]> = of([]);
  noCharterSelectedMessage: string = 'Please select a project charter to view FMEAs.';
  selectedCharterId: string | null = null;
  fmeaid: string;
  nofm: string = 'No failure modes found for this FMEA';
  showAddCardForm: boolean = false;
  editingCard: Fmea | null = null;
  showError = false;
  editingfm: FailureMode | null = null; 
  archivedFmeas: Fmea[] = [];
  archivedFm: FailureMode[] = [];
  hasfmeas: boolean = false;
  hasfme: boolean = false;

  showArchivedfmeas:boolean=false;
  showArchivedfm:boolean=false;

  newCard: Fmea = {
    title: '',
    description: '',
    id: '',
    projectCharterId: '',
    createdDate: undefined,
    updatedDate: undefined,
    failure_modes: []
  };
  newfm:FailureMode={
    id: '',
    title: '',
    severity: 0,
    occurrence: 0,
    detection: 0,
    rpn: 0,
    description: '',
    projectCharterId: '',
    createdDate: undefined,
    updatedDate: undefined,
    actionItems: []
  }
  showAddfmForm: boolean = false;

  maxRPN: number = 0;

  

  @ViewChild('CardForm', { static: false }) CardForm: ElementRef | undefined;
  @ViewChild('CardFM', { static: false }) CardFM: ElementRef | undefined;
  archivedActionItems: any[];


  scrollToAddCardForm() {
    if (this.CardForm) {
      this.CardForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }else if(this.CardFM){
      this.CardFM.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    }
  }

  constructor(
    private fmeaService: DmadvserviceService,
  ) {}



  onArchiveButtonClick(id: string): void {
    const confirmed = confirm('Are you sure you want to archive this FMEA ?');
    if (confirmed) {

    this.fmeaService.archivefmea(id).subscribe(
      (up) => {
        this.loadFmea();
      },
      (error) => {
        console.error('Error archiving :', error);
      }
    );
  }}
  
  UndoButtonClick(id: string): void {

    this.fmeaService.unarchivefmea(id).subscribe(
      (up) => {
        this.loadFmea();
        this.loadArchivedFmeas();
      },
      (error) => {
        console.error('Error undoing :', error);
      }
    );
  }
  toggleArchivedFmeas() {
    this.showArchivedfmeas = !this.showArchivedfmeas;
    if (this.showArchivedfmeas) {
      this.loadArchivedFmeas(); 
    }
  }

  loadArchivedFmeas() :void{
    this.fmea$ = this.fmeaService.selectedCharterId$.pipe(
      switchMap(charterId => {
        if (charterId) {
          this.selectedCharterId = charterId;

          return this.fmeaService.getArchivedfmea(charterId).pipe(
            catchError(error => {
              console.error('Error fetching archived fmeas:', error);
              return of([]); // Return empty array in case of error
            })
          );
        } else {
          return of([]); 
        }
      })
    );

    this.fmea$.subscribe(data => {
      this.archivedFmeas = data;
    });
  }
  ngOnInit(): void {
    this.loadFmea();
  }

  ngAfterViewInit(): void {
    if (this.showAddCardForm && this.CardForm) {
      this.CardForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }else if(this.showAddfmForm&& this.CardFM){
      this.CardFM.nativeElement.scrollIntoView({ behavior: 'smooth' });

    }
  }

  loadFmea(): void {
    this.fmea$ = this.fmeaService.selectedCharterId$.pipe(
      switchMap(charterId => {
        if (charterId) {

          this.selectedCharterId = charterId;
          this.noCharterSelectedMessage='';
          return this.fmeaService.getFmeasByProjectCharterId(charterId).pipe(
            catchError(error => {
              console.error('Error fetching FMEAs:', error);
              return of([]); // Return empty array in case of error
            })
          );
        } else {

          return of([]); // Return empty array if no charter ID is selected
        }
      })
    );

    this.fmea$.subscribe(data => {
      this.fmeas = data;
    });
  }

  selectFmea(fmea: Fmea): void {
    this.selectedFmea = fmea;
    this.loadFailureModes(fmea.id);
    this.fmeaid = fmea.id;
  }

  loadFailureModes(fmeaId: string): void {
    this.fmeaService.getFailureModes(fmeaId).subscribe(data => {
      this.failureModes = data;
      this.maxRPN = Math.max(...this.failureModes.map(fm => fm.rpn), 0);

    });
  }

  goBack(): void {
    this.selectedFmea = null;
    this.failureModes = [];
  }

  deleteFmea(fmeaId: string): void {
    const confirmed = confirm('Are you sure you want to delete this FMEA?');
    if (confirmed) {
      this.fmeaService.deleteFmea(fmeaId).subscribe(
        () => {
          this.archivedFmeas = this.archivedFmeas.filter(fmea => fmea.id !== fmeaId);
        },
        (error) => {
          console.error('Error deleting FMEA:', error);
        }
      );
    }
  }

  deleteFailureMode(fmid: string) {
    console.log(this.fmeaid, fmid)
    const confirmed = confirm('Are you sure you want to delete this failure mode?');
    if (confirmed) {
      const fmeaId = this.fmeaid;
      this.fmeaService.removeFailureMode(fmeaId, fmid).subscribe(
        () => {
          this.failureModes = this.failureModes.filter(failureMode => failureMode.id !== fmid);
        },
        (error) => {
          console.error('Error deleting failure mode:', error);
        }
      );
    }
  }

  toggleAddCardForm() {
    this.showAddCardForm = !this.showAddCardForm;
    if (this.showAddCardForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0);
    }
  }

  addFmea(addform: NgForm) {
    if (this.selectedCharterId && this.newCard.title && this.newCard.description) {
      this.newCard.projectCharterId = this.selectedCharterId;  // Ensure projectCharterId is set
      this.fmeaService.addFMEA(this.newCard,this.selectedCharterId).subscribe(
        (response) => {
          console.log('FMEA added successfully:', response);
          if (response) {
            this.newCard = {
              title: '',
              description: '',
              id: '',
              projectCharterId: '',
              createdDate: undefined,
              updatedDate: undefined,
              failure_modes: []
            };
            this.showAddCardForm = false;
            this.loadFmea();
            if (addform) {
              addform.resetForm();
            }
          }
        },
        (error) => {
          console.error('Error adding FMEA:', error);
        }
      );
    }
  }

  cancelAdd() {
    this.showAddCardForm = false;
  }
  updateFmea(form: NgForm) {
    if (form.valid) {
      if (this.editingCard && this.editingCard.id && this.editingCard.title && this.editingCard.description) {
        this.fmeaService.updateFmea(this.editingCard.id, this.editingCard).subscribe(
          (response) => {
            console.log('fmea updated successfully:', response);
            this.editingCard = null; // Clear editingCard after successful update
            this.loadFmea();
          },
          (error) => {
            console.error('Error updating fmea:', error);
          }
        );
      } else {
        this.showError = true; // Display error message if fields are missing
      }
    } else {
      this.showError = true; // Display error message if form is invalid
    }
  }
  
  editCard(fmea: Fmea) {
    this.editingCard = { ...fmea };
    this.showError = false;
  }

  cancelEdit() {
    this.editingCard = null;
    this.showError = false;
  }

  updateFailuremode(formF: NgForm) {
    if (formF.valid) {
      if (this.editingfm && this.editingfm.title&& this.editingfm.description&& this.editingfm.detection&& this.editingfm.occurrence&& this.editingfm.severity) {
        this.fmeaService.updateFailureModes(this.editingfm.id, this.editingfm).subscribe(
          (response) => {
            console.log('failure mode updated successfully:', response);
            this.editingfm = null; // Clear editingCard after successful update
            this.loadFailureModes(this.fmeaid);
          },
          (error) => {
            console.error('Error updating failure:', error);
          }
        );
      } else {
        this.showError = true; // Display error message if fields are missing
      }
    } else {
      this.showError = true; // Display error message if form is invalid
    }
  }
  
  editfailuremode(failure: FailureMode) {
    this.editingfm = { ...failure };
    this.showError = false;
  }

  cancelEditfailure() {
    this.editingfm = null;
    this.showError = false;
  }
  addFm(addform: NgForm) {
    if (this.fmeaid && this.newfm.description && this.newfm.title && this.newfm.occurrence && this.newfm.severity && this.newfm.detection) {
      this.fmeaService.addFailureMode(this.fmeaid,this.newfm).subscribe(
        (response) => {
          console.log('failure mode added successfully:', response);
          if (response) {
            this.newfm = {
              id: '',
    title: '',
    severity: 0,
    occurrence: 0,
    detection: 0,
    rpn: 0,
    description: '',
    projectCharterId: '',
    createdDate: undefined,
    updatedDate: undefined,
    actionItems: []
            };
            this.showAddfmForm = false;
            this.loadFailureModes(this.fmeaid);
            if (addform) {
              addform.resetForm();
            }
          }
        },
        (error) => {
          console.error('Error adding failure mode:', error);
        }
      );
    }
  }

  cancelAddfm() {
    this.showAddfmForm = false;
  }
  toggleAddFMForm() {
    this.showAddfmForm = !this.showAddfmForm;
    if (this.showAddfmForm) {
      setTimeout(() => this.scrollToAddCardForm(), 0);
    }
  }
  
}
