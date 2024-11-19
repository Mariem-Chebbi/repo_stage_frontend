import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { TaskServices } from '../../../../core/services/safe/taskService/task.service';

@Component({
  selector: 'ngx-task-charts',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  styleUrls: ['./task-charts.component.scss']
})
export class TaskChartsComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  private themeSubscription: Subscription = new Subscription();
  private taskStatsSubscription: Subscription = new Subscription();

  constructor(private theme: NbThemeService, private taskService: TaskServices) { }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      // Fetch task statistics and update chart
      this.taskStatsSubscription = this.taskService.getTaskStats().subscribe(stats => {
        const chartData = Object.keys(stats).map(status => ({
          value: stats[status],
          name: status
        }));

        this.options = {
          backgroundColor: echarts.bg,
          color: [
            colors.warningLight, 
            colors.infoLight, 
            colors.dangerLight, 
            colors.successLight, 
            colors.primaryLight
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            padding: [30, 0], // Add padding to the right to increase space
            data: Object.keys(stats),
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Task Status',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: chartData,
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
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.taskStatsSubscription) {
      this.taskStatsSubscription.unsubscribe();
    }
  }
}
