import { AfterViewInit, OnInit,Component } from '@angular/core';
import {ChartData,ChartOptions, Chart, registerables } from 'chart.js';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ngx-radar-chart-verify',
  templateUrl: './radar-chart-verify.component.html',
  styleUrls: ['./radar-chart-verify.component.scss']
})
export class RadarChartVerifyComponent implements OnInit, AfterViewInit {
  radarChartData: ChartData<'radar'>;
  radarChartOptions: ChartOptions<'radar'>;
  themeSubscription: Subscription;
  projectCharterId: string | null = null;
color:any;
  constructor(
    private theme: NbThemeService,
    private radarChartService: SIPOCserviceService
  ) { }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // Subscribe to the theme to configure chart options
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.color=colors;
      const chartjs: any = config.variables.chartjs;

      this.radarChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scaleFontColor: 'white',
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
          gridLines: {
            color: chartjs.axisLineColor,
          },
          angleLines: {
            color: chartjs.axisLineColor,
          },
        
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: chartjs.textColor,
            },
          },
        },
      };
    });

    // Fetch radar chart data using the service
    this.radarChartService.selectedCharterId$.subscribe(id => {
      if (id) {
        this.projectCharterId = id;
        this.radarChartService.getRadarChartData(id).subscribe(data => {
          this.radarChartData = {
            labels: data['labels'],
            datasets: [{
              label: 'Five Whys Count',
              data: data['data'],
              backgroundColor: NbColorHelper.hexToRgbA(this.color.warningLight, 0.5),
              borderColor: this.color.warning,
              borderWidth: 1,
            }],
          };
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  refreshData(): void {
    if (this.projectCharterId) {
      this.radarChartService.getRadarChartData(this.projectCharterId).subscribe(data => {
        this.radarChartData = {
          labels: data['labels'],
          datasets: [{
            label: 'Five Whys Count',
            data: data['data'],
            backgroundColor: NbColorHelper.hexToRgbA('#fa0', 0.2), // Customize color
            borderColor: '#fa0', // Customize border color
            borderWidth: 1,
          }],
        };
      });
    }
  }
}
