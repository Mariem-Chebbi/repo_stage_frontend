import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { Requirement } from '../../../core/models/LSS_models/Requirement';
import { Ctq } from '../../../core/models/LSS_models/Ctq';

@Component({
  selector: 'ngx-verifyphase',
  templateUrl: './verifyphase.component.html',
  styleUrls: ['./verifyphase.component.scss'],
})
export class VerifyphaseComponent implements OnInit ,AfterViewInit{
  selectedReqId: string | null = null;
  requirements: Requirement[] = [];
  ctqs: Ctq[] = [];
  selectedCharterId: string | null = null;
  noCharterSelectedMessage: string = 'Please select a project charter to view requirements.';
  buttonDashboard: boolean = false;
  ctqTableSettings = {
    columns: {
      description: {
        title: 'Description',
        type: 'string',
      },
      isMet: {
        title: 'Is the quality verified ?',
        type: 'custom',
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (cell, row) => {
          console.log('Preparing value for checkbox:', row); // Debugging
          return {
            isMet: row.isMet, 
            id: row.id      
          };
        },
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
  };
  
  
  @ViewChild('Dashboard', { static: false }) Dashboard: ElementRef | undefined;


  scrollToAddCardForm() {
    if (this.Dashboard) {
      this.Dashboard.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  constructor(private service: DmadvserviceService) {}

  ngOnInit(): void {
    this.service.selectedCharterId$.subscribe((charterId) => {
      console.log('Received charter ID:', charterId); // Check if charterId is being logged
      this.selectedCharterId = charterId;
      if (charterId) {
        this.loadRequirements(charterId);
      } else {
        this.requirements = [];
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.buttonDashboard && this.Dashboard) {
      this.Dashboard.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  loadRequirements(charterId: string): void {
    this.service.getRequirementsByProjectCharterId(charterId).subscribe(
      (data: Requirement[]) => {
        this.requirements = data;
      },
      (error) => {
        console.error('Error fetching requirements:', error);
      }
    );
  }

  loadCtqs(id: string): void {
    this.service.getCtqByReqId(id).subscribe(
      (data: Ctq[]) => {
        this.ctqs = data;
      },
      (error) => {
        console.error('Error fetching ctqs:', error);
      }
    );
  }

  onReqSelected(id: string) {
    this.selectedReqId = id;
    this.loadCtqs(id);
  }


  ButtonDashClicked() {
      setTimeout(() => this.scrollToAddCardForm(), 0);
    
  }
}
