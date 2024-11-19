import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { ChartData, ChartOptions } from 'chart.js';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-controlphase',
  templateUrl: './controlphase.component.html',
  styleUrls: ['./controlphase.component.scss']
})
export class ControlphaseComponent implements OnInit, OnDestroy {
  progress: number = 0;
  private kanbanIdSubscription: Subscription;
  private kanbanId: string | null = null;
  projectCharterId: string | null = null;

  totalFivewhys: number = 0;
  fivewhysWithoutSolution: number = 0;

  pieChartData: ChartData<'pie'> = {
    labels: ['Total Five Whys', 'Five Whys Without Solution'],
    datasets: [{
      data: [0, 0], // Initial values
      backgroundColor: [], // Background colors will be set dynamically
    }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#666', // Adjust color as needed
        },
      },
      tooltip: {
        enabled: true,
      }
    }
  };



  themeSubscription: any;

  constructor(private service: SIPOCserviceService, private theme: NbThemeService) {}

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      // Update pie chart colors
      this.pieChartData.datasets[0].backgroundColor = [
        colors.primaryLight, // Color for 'Total Five Whys'
        colors.infoLight,    // Color for 'Five Whys Without Solution'
      ];
    });

    this.service.selectedCharterId$.subscribe(id => {
      this.projectCharterId = id;
      this.refreshFivewhysData();
    });

    this.kanbanIdSubscription = this.service.selectedKanbanId$.subscribe(kanbanId => {
      this.kanbanId = kanbanId;
      if (kanbanId) {
        this.refreshFivewhysData();

       
      }
    });
  }

  ngOnDestroy(): void {
    if (this.kanbanIdSubscription) {
      this.kanbanIdSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }


  refreshFivewhysData(): void {
    if (this.projectCharterId) {
      this.service.getCountByProject(this.projectCharterId).subscribe(
        count => {
          this.totalFivewhys = count;
          this.updatePieChartData();
        },
        error => {
          console.error('Error fetching total Five Whys count:', error);
        }
      );

      this.service.getCountWithoutSolution(this.projectCharterId).subscribe(
        count => {
          this.fivewhysWithoutSolution = count;
          this.updatePieChartData();
        },
        error => {
          console.error('Error fetching Five Whys without solution count:', error);
        }
      );
    }
  }

  updatePieChartData(): void {
    this.pieChartData.datasets[0].data = [this.totalFivewhys, this.fivewhysWithoutSolution];
  }

  

  refreshFivewhys(): void {
    this.refreshFivewhysData();
  }
 
}
