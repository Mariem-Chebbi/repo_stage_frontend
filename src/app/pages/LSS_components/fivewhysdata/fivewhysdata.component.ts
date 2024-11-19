import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { NbThemeService } from '@nebular/theme';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-fivewhysdata',
  templateUrl: './fivewhysdata.component.html',
  styleUrls: ['./fivewhysdata.component.scss']
})
export class FivewhysdataComponent implements OnInit {
  projectCharterId: string | null = null;

  totalFivewhys: number = 0;
  fivewhysWithoutSolution: number = 0;
color:any;
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

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

constructor(private service: SIPOCserviceService, private theme: NbThemeService){
  
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    const colors: any = config.variables;
    this.color = colors;
  });
}

ngOnInit(): void {
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    const colors: any = config.variables;
    const chartjs: any = config.variables.chartjs;

    // Update pie chart colors
    this.pieChartData.datasets[0].backgroundColor=[colors.primaryLight, colors.infoLight, colors.successLight]

  });

  this.service.selectedCharterId$.subscribe(id => {
    this.projectCharterId = id;
    this.updatePieChartData();
    this.refreshFivewhysData();
    if (this.chart) {
      this.chart.update();  // Explicitly update the chart
    }
  });
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
   if (this.chart) {
      this.chart.update();  // Ensure the chart updates with new data
    }
    
}



refreshFivewhys(): void {
  this.refreshFivewhysData();
}}
