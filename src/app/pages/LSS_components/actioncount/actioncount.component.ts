import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { ChartData, ChartOptions } from 'chart.js';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-actioncount',
  templateUrl: './actioncount.component.html',
  styleUrls: ['./actioncount.component.scss']
})
export class ActioncountComponent implements OnInit, OnDestroy {
  projectCharterId: string;
  themeSubscription: Subscription;
  projectCharterIdSubscription: Subscription;
  color: any;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  actionItemBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  actionItemBarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Failure Modes'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Action Items Count'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  constructor(
    private fmeaService: DmadvserviceService,
    private theme: NbThemeService
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.color = colors;
    });
  }

  ngOnInit(): void {
    this.projectCharterIdSubscription = this.fmeaService.selectedCharterId$.subscribe(id => {
      if (id) {
        this.projectCharterId = id;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.fmeaService.getActionItemCounts(this.projectCharterId).subscribe(
      data => {
        this.updateBarChartData(data);
        if (this.chart) {
          this.chart.update();  // Explicitly update the chart
        }
      },
      error => {
        console.error('Error fetching action item counts:', error);
      }
    );
  }

  updateBarChartData(data: { [fmeaId: string]: { [failureMode: string]: number } }): void {
    const labels: string[] = [];
    const counts: number[] = [];

    for (const fmeaId in data) {
      if (data.hasOwnProperty(fmeaId)) {
        const failureModes = data[fmeaId];
        for (const failureMode in failureModes) {
          if (failureModes.hasOwnProperty(failureMode)) {
            labels.push(failureMode);
            counts.push(failureModes[failureMode]);
          }
        }
      }
    }

    this.actionItemBarChartData = {
      labels: labels,
      datasets: [{
        label: 'Action Items Count',
        data: counts,
        backgroundColor: NbColorHelper.hexToRgbA(this.color.primary, 0.3),
        borderColor: this.color.primary,
        borderWidth: 1,
      }]
    };

    if (this.chart) {
      this.chart.update();  // Ensure the chart updates with new data
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
    this.projectCharterIdSubscription.unsubscribe();
  }
}
