import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../../core/services/cig2_services/project.service';


@Component({
  selector: 'ngx-sonar-analysis',
  templateUrl: './sonar-analysis.component.html',
  styleUrls: ['./sonar-analysis.component.scss']
})
export class SonarAnalysisComponent implements OnInit {
  projectKey: string;
  sonarMetrics: any[] = [];
  analysisDate: string;
  pieChartData: any[] = [];
  barChartData: any[] = [];
  colorScheme = {
    domain: ['#2196f3', '#4caf50', '#ff9800', '#f44336']
  };
  areChartsVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sonarService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectKey = this.route.snapshot.paramMap.get('id')!;
    this.loadSonarMetrics();
    this.loadSonarAnalysisDate();
    this.loadAdditionalStatistics();
  }

  loadSonarMetrics(): void {
    this.sonarService.getSonarMetrics(this.projectKey).subscribe(
      metrics => {
        this.sonarMetrics = metrics.component.measures;
        this.prepareChartsData();
      },
      error => {
        console.error('Failed to fetch Sonar metrics', error);
      }
    );
  }

  loadSonarAnalysisDate(): void {
    this.sonarService.getSonarAnalysisDate(this.projectKey).subscribe(
      response => {
        if (response.analyses && response.analyses.length > 0) {
          this.analysisDate = response.analyses[0].date;
        } else {
          console.warn('No analysis date found');
        }
      },
      error => {
        console.error('Failed to fetch Sonar analysis date', error);
      }
    );
  }

  loadAdditionalStatistics(): void {
    this.sonarService.getAdditionalStatistics(this.projectKey).subscribe(
      stats => {
        this.prepareChartsData();
      },
      error => {
        console.error('Failed to fetch additional statistics', error);
      }
    );
  }

  prepareChartsData(): void {
    this.pieChartData = [
      { name: 'Coverage', value: +this.sonarMetrics.find(m => m.metric === 'coverage')?.value || 0 },
      { name: 'Bugs', value: +this.sonarMetrics.find(m => m.metric === 'bugs')?.value || 0 },
      { name: 'Code Smells', value: +this.sonarMetrics.find(m => m.metric === 'code_smells')?.value || 0 },
      { name: 'Duplicated Lines Density', value: +this.sonarMetrics.find(m => m.metric === 'duplicated_lines_density')?.value || 0 },
      { name: 'Vulnerabilities', value: +this.sonarMetrics.find(m => m.metric === 'vulnerabilities')?.value || 0 }
    ];

    this.barChartData = [
      {
        name: 'Metrics',
        series: this.sonarMetrics.map(metric => ({
          name: metric.metric,
          value: +metric.value
        }))
      }
    ];
  }

  toggleCharts(): void {
    this.areChartsVisible = !this.areChartsVisible;
  }
}
