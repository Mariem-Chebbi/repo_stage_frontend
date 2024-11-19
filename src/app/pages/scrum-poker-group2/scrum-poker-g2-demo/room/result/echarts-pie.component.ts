import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import {ApiService} from '../../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  sessionId: string | null = null;

  constructor(
    private theme: NbThemeService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit() {
    this.route.paramMap.subscribe(params => {
      this.sessionId = params.get('id');
      if (this.sessionId) {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors = config.variables;
          const echarts: any = config.variables.echarts;

          // Appel au service pour obtenir la distribution des votes
          this.apiService.getVoteDistribution(this.sessionId).subscribe(data => {
            const pieData = Object.keys(data).map(key => ({
              name: key,
              value: data[key].count,
              percentage: data[key].percentage,
            }));

            this.options = {
              backgroundColor: echarts.bg,
              color: [
                colors.primaryLight,
                colors.infoLight,
                colors.successLight,
                colors.warningLight,
                colors.dangerLight,
              ],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: pieData.map(item => item.name),
                textStyle: {
                  color: echarts.textColor,
                },
              },
              series: [
                {
                  name: 'Votes',
                  type: 'pie',
                  radius: '50%',
                  center: ['50%', '50%'],
                  data: pieData,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: echarts.itemHoverShadowColor,
                    },
                  },
                  label: {
                    normal: {
                      formatter: '{b} ({d}%)',

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
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
