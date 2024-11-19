import { Component, OnDestroy, OnInit } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-defectrate',
  templateUrl: './defectrate.component.html',
  styleUrls: ['./defectrate.component.scss']
})
export class DefectrateComponent implements OnInit,OnDestroy{
  private projectCharterId: string | null = null;
  defectRate: number = 0.0;
  private subscription: Subscription;

  constructor(private service: DmadvserviceService) {}

  ngOnInit(): void {
    this.subscription = this.service.selectedCharterId$.subscribe(id => {
      this.projectCharterId = id;
      if (this.projectCharterId) {
        this.getDefectRate(this.projectCharterId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDefectRate(projectCharterId: string): void {
    this.service.calculateDefectRateByProjectCharterId(projectCharterId).subscribe(
      rate => {
        this.defectRate = rate;
      },
      error => {
        console.error('Error fetching defect rate:', error);
      }
    );
  }
  refreshDefectRate():void{
    if (this.projectCharterId) {
      this.getDefectRate(this.projectCharterId);
    }    
  }
}
