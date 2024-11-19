import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { Subscription } from 'rxjs';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-cardpercentagebymonth',
  templateUrl: './cardpercentagebymonth.component.html',
  styleUrls: ['./cardpercentagebymonth.component.scss']
})
export class CardpercentagebymonthComponent implements OnInit {
  themeSubscription: any;
color:any;
  private kanbanIdSubscription: Subscription;
  private kanbanId: string | null = null;
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    }
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private service: SIPOCserviceService,private theme: NbThemeService){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      this.color=colors;
      const chartjs: any = config.variables.chartjs;
    })
  }
  ngOnInit(): void {
    this.kanbanIdSubscription = this.service.selectedKanbanId$.subscribe(kanbanId => {
      this.kanbanId = kanbanId;
      if (kanbanId) {
        this.service.getCardMonthPercentages(kanbanId).subscribe(data => {
          this.refreshBarData();
          
        });
      }
    });

}

refreshBarData(): void {
  if (this.kanbanId) {
    this.service.getCardMonthPercentages(this.kanbanId).subscribe(
      count => {
        this.barChartData = count;
        this.updateBarChartData(count);
        if (this.chart) {
          this.chart.update();  // Explicitly update the chart
        }
      },
      error => {
        console.error('Error:', error);
      }
    );

    
  }
}
updateBarChartData(data: { [key: string]: number }): void {
  this.barChartData.labels = Object.keys(data);
  this.barChartData.datasets = [
    {
      label: 'Card Percentage per Month',
      data: Object.values(data),
      backgroundColor: NbColorHelper.hexToRgbA(this.color.successLight, 0.3),
      borderColor: this.color.successLight,

      borderWidth: 1,
    }
  ];
  if (this.chart) {
    this.chart.update();  // Ensure the chart updates with new data
  }
}
}
