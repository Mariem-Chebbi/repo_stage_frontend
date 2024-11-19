import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { KpiService } from '../../../../../core/FDDG2_Services/kpi.service';
import { NbThemeService } from '@nebular/theme';
import { TasksService } from '../../../../../core/FDDG2_Services/tasks.service';
import { Tasks } from '../../../../../core/FDDG2_Models/tasks';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  completionRate: number = 0;
  task: Tasks[] = [];
  completedTasksCount: number = 0;
  notCompletedTasksCount: number = 0;
  toDoTasksCount: number = 0;
  inProgressTasksCount: number = 0;
  pendingTasksCount: number = 0;

  options: any = {};
  themeSubscription: any;
  pollingSubscription: Subscription;

  constructor(private kpiService: KpiService, private theme: NbThemeService, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling(): void {
    this.pollingSubscription = interval(5000)  // Poll every 5 seconds
      .subscribe(() => {
        this.fetchTasks();
        this.kpiService.getFeatureCompletionRate().subscribe(rate => {
          this.completionRate = rate;
        });
      });
  }

  fetchTasks(): void {
    this.tasksService.getAllTasks().subscribe(
      (tasks) => {
        this.task = tasks;
        this.completedTasksCount = this.countCompletedTasks(tasks);
        this.notCompletedTasksCount = this.countNotCompletedTasks(tasks);
        this.toDoTasksCount = this.countToDoTasks(tasks);
        this.inProgressTasksCount = this.countInProgressTasks(tasks);
        this.pendingTasksCount = this.countPendingTasks(tasks);
        // Update the chart options with the new data
        this.updateChartOptions();
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  updateChartOptions(): void {
    this.options = {
      ...this.options,
      series: [
        {
          ...this.options.series[0],
          data: [
            { value: this.completedTasksCount, name: 'Completed' },
            { value: this.notCompletedTasksCount, name: 'Not Completed' },
            { value: this.toDoTasksCount, name: 'To Do' },
            { value: this.pendingTasksCount, name: 'Pending' },
            { value: this.inProgressTasksCount, name: 'In Progress' }
          ]
        }
      ]
    };
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Completed', 'Not Completed', 'To Do', 'Pending', 'In Progress'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Status',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [],  // Initially empty, will be populated by fetchTasks
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

  countCompletedTasks(tasks: Tasks[]): number {
    return tasks.filter(task => task.status === 'Completed').length;
  }

  countNotCompletedTasks(tasks: Tasks[]): number {
    return tasks.filter(task => task.status === 'NotCompleted').length;
  }

  countToDoTasks(tasks: Tasks[]): number {
    return tasks.filter(task => task.status === 'ToDo').length;
  }

  countInProgressTasks(tasks: Tasks[]): number {
    return tasks.filter(task => task.status === 'InProgress').length;
  }

  countPendingTasks(tasks: Tasks[]): number {
    return tasks.filter(task => task.status === 'Pending').length;
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
    this.themeSubscription.unsubscribe();
  }
}
