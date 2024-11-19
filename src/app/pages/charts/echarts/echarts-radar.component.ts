import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TasksService } from '../../../core/FDDG2_Services/tasks.service';
import { Tasks } from '../../../core/FDDG2_Models/tasks';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'ngx-echarts-radar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsRadarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  avgResponsivity: number = 0;
  avgErgonomics: number = 0;
  avgDeadlineC: number = 0;
  avgDescriptionC: number = 0;
  avgTechUse: number = 0;
  pollingSubscription: Subscription;
  constructor(private theme: NbThemeService, private tasksService: TasksService) { }

  tasks: Tasks[] = [];

  ngOnInit(): void {
    this.startPolling();
  }

  fetchTasks(): void {
    this.tasksService.getAllTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.calculateAverages(tasks);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  calculateAverages(tasks: Tasks[]): void {
    if (tasks.length === 0) {
      console.log('No tasks available');
      return;
    }

    let totalResponsivity = 0;
    let totalErgonomics = 0;
    let totalDeadlineC = 0;
    let totalDescriptionC = 0;
    let totalTechUse = 0;
    let totalTasks = 0;

    tasks.forEach(task => {
      if (task.status === "Completed") {
        totalResponsivity += task.responsivity || 0;
        totalErgonomics += task.ergonomics || 0;
        totalDeadlineC += task.deadlineC || 0;
        totalDescriptionC += task.descriptionC || 0;
        totalTechUse += task.techUse || 0;
        totalTasks += 1;
      }
    });

    if (totalTasks === 0) {
      console.log('No completed tasks available to calculate averages.');
      return;
    }

    this.avgResponsivity = parseFloat((totalResponsivity / totalTasks).toFixed(2));
    this.avgErgonomics = parseFloat((totalErgonomics / totalTasks).toFixed(2));
    this.avgDeadlineC = parseFloat((totalDeadlineC / totalTasks).toFixed(2));
    this.avgDescriptionC = parseFloat((totalDescriptionC / totalTasks).toFixed(2));
    this.avgTechUse = parseFloat((totalTechUse / totalTasks).toFixed(2));

    this.updateChartOptions();
  }

  updateChartOptions(): void {
    this.options = {
      ...this.options,
      series: [
        {
          name: 'Manajero',
          type: 'radar',
          data: [
            {
              value: [
                this.avgResponsivity,
                this.avgErgonomics,
                this.avgTechUse,
                this.avgDescriptionC,
                this.avgDeadlineC,
              ],
              name: 'Manajero',
            },
          ],
        },
      ],
    };
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.warning],
        tooltip: {},
        legend: {
          data: ['Manajero'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: [
            { name: 'Responsivity', max: 5 },
            { name: 'Ergonomics', max: 5 },
            { name: 'Techology Use', max: 5 },
            { name: 'Description Commitment', max: 5 },
            { name: 'Deadline Commitment', max: 5 },
          ],
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {

            name: 'Manajero',
            type: 'radar',
            data: [
              {
                value: [0, 0, 0, 0, 0], // Initialize with default values
                name: 'Manajero',
              },
            ],
          },
        ],
      };
    });
  }

  startPolling(): void {
    this.pollingSubscription = interval(5000)  // Poll every 5 seconds
      .subscribe(() => {
        this.fetchTasks();
      });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
