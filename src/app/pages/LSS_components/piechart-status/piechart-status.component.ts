import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'ngx-piechart-status',
  templateUrl: './piechart-status.component.html',
  styleUrls: ['./piechart-status.component.scss']
})
export class PiechartStatusComponent implements OnInit, OnDestroy {
  private kanbanIdSubscription: Subscription;
  private kanbanId: string | null = null;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  statusChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  };

  statusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            return `${label}: ${value.toFixed(2)}%`;
          }
        }
      }
    }
  };

  constructor(private service: SIPOCserviceService) {}

  ngOnInit(): void {
    this.kanbanIdSubscription = this.service.selectedKanbanId$.subscribe(kanbanId => {
      this.kanbanId = kanbanId;
      if (kanbanId) {
        this.refreshData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.kanbanIdSubscription) {
      this.kanbanIdSubscription.unsubscribe();
    }
  }

  refreshData(): void {
    if (this.kanbanId) {
      this.service.getCardStatusPercentages(this.kanbanId).subscribe(data => {
        this.updateStatusChartData(data);
        if (this.chart) {
          this.chart.update();  // Explicitly update the chart
        }
      });
    }
  }

  updateStatusChartData(data: { [key: string]: number }): void {
    this.statusChartData.labels = Object.keys(data);
    this.statusChartData.datasets[0].data = Object.values(data);
    this.statusChartData.datasets[0].backgroundColor = this.generateColors(Object.keys(data).length);
    if (this.chart) {
      this.chart.update();  // Ensure the chart updates with new data
    }
  }

  generateColors(count: number): string[] {
    const colors = ['#ff978a', '#ff4a4e', '#d30e2a', '#59ac57', '#003fc6', '#dd5480'];
    return colors.slice(0, count);
  }
}
