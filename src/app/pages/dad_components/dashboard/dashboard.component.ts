import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { ReleaseService } from '../../../core/services/dad_services/release.service';
import { FeatureService } from '../../../core/services/dad_services/feature.service';
import { DashboardService } from '../../../core/services/dad_services/dashboard.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projectId?: any;

  results1 = [];
  results2 = [];  // Empty initially, will be populated with API data
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Release Status';
  yAxisLabel = 'Percentage';
  colorScheme: any;
  themeSubscription: any;
  data: any;
  options1: any;
  options2: any;
  type = 'pie';
  statistics?: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private releaseService: ReleaseService,
    private featureService: FeatureService,
    private theme: NbThemeService,
    private dashboardService: DashboardService
  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id'); // No conversion needed for string IDs
    });

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });

    this.featureService.getStatusPercentages(this.projectId).subscribe(statusPercentages => {
      this.options1 = {
        backgroundColor: echarts.bg,
        color: this.getColors(statusPercentages.length),
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: statusPercentages.map(status => status.status),
          textStyle: {
            color: 'echarts.textColor',
          },
        },
        series: [
          {
            name: 'Feature Status',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: statusPercentages.map(status => ({
              value: status.percentage,
              name: status.status,
            })),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });

  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.releaseService.getAll(this.projectId).subscribe(releases => {
        // Prepare the data for the chart
        const dates = releases.map(release => release.releaseDate); // Adapt as needed
        const progressData = releases.map(release => {
          // Calculate progress based on status or other criteria
          return release.status === 'Released' ? 100 : 0; // Example: 100 if released, 0 if not released
        });

        this.options2 = {
          backgroundColor: echarts.bg,
          color: [colors.primary, colors.info],
          tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>{a} : {c}%',
          },
          legend: {
            left: 'left',
            data: ['Release Progress'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          xAxis: [
            {
              type: 'category',
              data: dates,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
              min: 0,
              max: 100,
              interval: 20,
            },
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'Release Progress',
              type: 'line',
              data: progressData,
              smooth: true, // Optional: for smoother lines
            },
          ],
        };
      });
    });
  }

  public releasePredictabilityData = {
    labels: ['Release Predictability'],
    datasets: [
      {
        label: 'On-Time Releases (%)',
        data: [0], // Initial data
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  public releasePredictabilityOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };


  ngOnInit(): void {// Replace with actual project ID
    this.releaseService.getReleasePredictability(this.projectId).subscribe(predictability => {
      this.results2 = [
        { name: 'Released', value: predictability },
        { name: 'Unreleased', value: 100 - predictability },
      ];
    });

    this.getStatistics();
  }

  goToTheMethod() {
    this.router.navigate(['/pages/agile/dad/steps/' + this.projectId]);

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  getColors(length: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF'
    ];
    return colors.slice(0, length); // Slice to the number of statuses
  }

  loadReleaseData() {
    this.releaseService.getAll(this.projectId).subscribe((releases) => {
      // Transforme les données reçues pour les adapter au format requis
      const labels = releases.map(release => release.startDate); // Adapté en fonction des données disponibles
      const progressData = releases.map(release => release.progress);

      this.data.labels = labels;
      this.data.datasets[0].data = progressData;
    });
  }

  getStatistics() {
    this.dashboardService.get(this.projectId).subscribe(
      (data) => {
        this.statistics = data
      }
    )
  }


}
