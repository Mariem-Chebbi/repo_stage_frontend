import { Component, OnInit } from '@angular/core';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { ChartData, ChartOptions ,Label, SingleDataSet} from 'chart.js';

@Component({
  selector: 'ngx-countverify',
  templateUrl: './countverify.component.html',
  styleUrls: ['./countverify.component.scss']
})
export class CountverifyComponent implements OnInit {
  archivedFmeaCount: number = 0;
  archivedPrototypeCount: number = 0;
  projectCharterId: string; // Replace with actual ID

  // Donut Chart Data
  donutChartLabels: Label[] = ['Archived FMEAs', 'Archived Prototypes'];
  donutChartData: ChartData<'doughnut'> = {
    labels: this.donutChartLabels,
    datasets: [
      {
        data: [this.archivedFmeaCount, this.archivedPrototypeCount],
        backgroundColor: ['#0095ff', '#36f'], // You can customize colors here
        hoverBackgroundColor: ['#ff6384', '#36a2eb']
      }
    ]
  };
  donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        }
      }
    }
  };

  constructor(private countService: DmadvserviceService) {}

  ngOnInit(): void {
    this.countService.selectedCharterId$.subscribe(id => {
      this.projectCharterId = id;
      this.loadCounts(); 
    });
  }

  loadCounts(): void {
    this.countService.getArchivedFmeaCount(this.projectCharterId).subscribe(count => {
      this.archivedFmeaCount = count;
      this.updateChartData();
    });

    this.countService.getArchivedPrototypeCount(this.projectCharterId).subscribe(count => {
      this.archivedPrototypeCount = count;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.donutChartData.datasets[0].data = [this.archivedFmeaCount, this.archivedPrototypeCount];
  }
}
