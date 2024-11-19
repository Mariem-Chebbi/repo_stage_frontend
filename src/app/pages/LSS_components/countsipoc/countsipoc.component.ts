import { Component, OnInit } from '@angular/core';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';

@Component({
  selector: 'ngx-countsipoc',
  templateUrl: './countsipoc.component.html',
  styleUrls: ['./countsipoc.component.scss']
})
export class CountsipocComponent implements OnInit{
  projectCharterId: string;
  sipocId :string; 
  supplierCount: number;
  inputCount: number;
  processCount: number;
  outputCount: number;
  customerCount: number;

  constructor(private sipocService: SIPOCserviceService) { }

  ngOnInit(): void {
    this.sipocService.selectedCharterId$.subscribe(id => {
      this.projectCharterId = id;
      this.loadSIPOCs(id); 
    });
  }
  
  loadSIPOCs(charterId: string) {
    console.log('Loading SIPOCs for charter ID:', charterId);
    this.sipocService.getSipocByProjectCharterId(charterId).subscribe(
      data => {
        console.log('Fetched SIPOC data:', data);
        if (data && data.id_sipoc) {
          this.sipocId = data.id_sipoc; // Save the SIPOC ID for later use
          console.log(this.sipocId);
          this.loadSipocCounts();
         
        } 
      },
      error => {
        console.error('Error fetching SIPOCs', error);
      
      }
    );
  }
  loadSipocCounts(): void {
    this.sipocService.countSuppliers(this.sipocId).subscribe(count => {
      this.supplierCount = count;
    });

    this.sipocService.countInputs(this.sipocId).subscribe(count => {
      this.inputCount = count;
    });

    this.sipocService.countProcesses(this.sipocId).subscribe(count => {
      this.processCount = count;
    });

    this.sipocService.countOutputs(this.sipocId).subscribe(count => {
      this.outputCount = count;
    });

    this.sipocService.countCustomers(this.sipocId).subscribe(count => {
      this.customerCount = count;
    });
  }
}
