import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { ChartData, ChartOptions } from 'chart.js';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-ctq-percentage-chart',
  templateUrl: './ctq-percentage-chart.component.html',
  styleUrls: ['./ctq-percentage-chart.component.scss']
})
export class CtqPercentageChartComponent implements OnInit{
  data: any;
  options: any;
  color:any;
  themeSubscription: any;
  projectCharterId: string;
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

  constructor(
    private servicce: DmadvserviceService,
    private theme: NbThemeService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.color = colors;
    });
  }
  ngOnInit(): void {
   
        this.servicce.selectedCharterId$.subscribe(id => {
        if (id) {
          this.projectCharterId = id;
          this.servicce.getIsMetPercentages(this.projectCharterId).subscribe(data => {
            this.refreshData();
          }, error => {
            console.error('Error fetching data:', error);
          });
        }
      });
  }

  
  updateBarChartData(data: { [key: string]: number }): void {
    this.barChartData.labels = Object.keys(data);
    this.barChartData.datasets = [
      {
        label: 'Percentage of Verified CTQs',
        data: Object.values(data),
        backgroundColor: NbColorHelper.hexToRgbA(this.color.danger, 0.3),
        borderColor: this.color.danger,
        borderWidth: 3,
      }
    ];
    if (this.chart) {
      this.chart.update();  // Ensure the chart updates with new data
    }
  }

  refreshData(): void {
    if (this.projectCharterId) {
      this.servicce.getIsMetPercentages(this.projectCharterId).subscribe(
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
  }}