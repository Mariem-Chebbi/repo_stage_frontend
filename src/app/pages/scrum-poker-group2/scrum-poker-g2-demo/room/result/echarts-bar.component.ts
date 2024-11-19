import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart" style="height: 400px;"></div>
  `,
})
export class EchartsBarComponent implements OnInit, OnDestroy {
  options: any = {};
  themeSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;

  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const sessionId = params.get('id');
      if (sessionId) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;

          this.apiService.getVoteFrequencyForSession(sessionId)
            .subscribe(frequencyData => {
              const categories = Object.keys(frequencyData);
              const data = Object.values(frequencyData);

              this.options = {
                backgroundColor: echarts.bg,
                color: [colors.primaryLight],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow',
                  },
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true,
                },
                xAxis: [
                  {
                    type: 'category',
                    data: categories,
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
                  },
                ],
                series: [
                  {
                    name: 'Votes',
                    type: 'bar',
                    barWidth: '60%',
                    data: data,
                  },
                ],
              };
            });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
