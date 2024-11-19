import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';

@Component({
  selector: 'ngx-pareto-chart',
  templateUrl: './pareto-chart.component.html',
  styleUrls: ['./pareto-chart.component.scss']
})
export class ParetoChartComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  mixedChart: any;

  constructor(private paretoService: SIPOCserviceService) { }

  ngOnInit(): void {
    this.refreshChart();
  }

  refreshChart(): void {
    this.paretoService.getParetoData().subscribe(
      data => {
        console.log('Data fetched:', data);  // Log data
        this.renderParetoChart(data);
      },
      error => {
        console.error('Error fetching data:', error);  // Log error
      }
    );
  }

  renderParetoChart(data): void {
    if (!data || data.length === 0) {
      console.error('No data available to render chart');  // Log no data case
      return;
    }

    const labels = data.map(d => d.category);
    const counts = data.map(d => d.count);
    const cumulativePercentages = data.map(d => d.cumulativePercentage);

    console.log('Labels:', labels);  // Log labels
    console.log('Counts:', counts);  // Log counts
    console.log('Cumulative Percentages:', cumulativePercentages);  // Log percentages

    const ctx = this.canvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');  // Log canvas context error
      return;
    }

    if (this.mixedChart) {
      this.mixedChart.destroy();  // Destroy the previous chart instance
    }

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Pareto Chart of Problem Categories'
      },
      scales: {
        yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Count'
          },
          ticks: {
            beginAtZero: true
          }
        }, {
          id: 'y-axis-2',
          type: 'linear',
          position: 'right',
          scaleLabel: {
            display: true,
            labelString: 'Cumulative Percentage'
          },
          ticks: {
            beginAtZero: true,
            max: 100
          }
        }]
      }
    };

    this.mixedChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Count',
          data: counts,
          backgroundColor: 'rgba(51, 102, 255, 0.2)',
          borderColor: 'rgba(51, 102, 255, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-1'
        }, {
          label: 'Cumulative %',
          data: cumulativePercentages,
          type: 'line',
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          yAxisID: 'y-axis-2'
        }]
      },
      options: options
    });

    console.log('Chart rendered');  // Log chart rendering completion
  }
}
