import { Component, OnInit } from '@angular/core';

import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { ProjectStatisticsDTO } from '../../../../core/models/ProjectStatisticsDTO';
import { StatisticsService } from '../../../../core/models/service/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  totalProjects: number = 0;
  totalTasks: number = 0;
  totalFeedbacks: number = 0;
  projectStatistics: ProjectStatisticsDTO[] = [];
  averageTaskCompletionTime: number = 0;
  percentageOfCompletedTasks: number = 0;
  projectCompletionPercentage: number = 0;
  taskCompletionRate: number = 0;
  statistics: any[] = [];

  constructor(
    private statisticsService: StatisticsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }
  
  loadStatistics(): void {
    this.statisticsService.getTotalNumberOfProjects().subscribe(data => this.totalProjects = data);
    this.statisticsService.getTotalNumberOfTasks().subscribe(data => this.totalTasks = data);
    this.statisticsService.getTotalNumberOfFeedbacks().subscribe(data => this.totalFeedbacks = data);
    this.statisticsService.getAllProjectsWithStatistics().subscribe(data => {
      this.projectStatistics = data;
      this.createProjectFeedbacksBarChart(); 
      this.createProjectTasksPieChart();
    });
    this.statisticsService.getAverageTaskCompletionTime().subscribe(data => this.averageTaskCompletionTime = data);
    this.statisticsService.getPercentageOfCompletedTasks().subscribe(data => {
      this.percentageOfCompletedTasks = data;
      this.createProjectCompletionPercentageChart();
    });
    this.statisticsService.getPercentageOfCompletedTasksForProject('all').subscribe(data => {
      this.projectCompletionPercentage = data;
      this.createTaskCompletionRateChart();
    });
  }

  createProjectFeedbacksBarChart(): void {
    const projectNames = this.projectStatistics.map(stats => stats.name);
    const projectFeedbacks = this.projectStatistics.map(stats => stats.numberOfFeedbacks);
  
    // Dynamically generate colors if there are more projects than colors in the array
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0', 
      '#FF9800', '#03A9F4', '#E91E63', '#4CAF50', '#9E9E9E'
    ];
    
    while (colors.length < projectNames.length) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
  
    // Create the chart
    new Chart('projectFeedbacksBarChart', {
      type: 'bar',
      data: {
        labels: projectNames,
        datasets: [{
          label: 'Number of Feedbacks',
          data: projectFeedbacks,
          backgroundColor: colors.slice(0, projectNames.length), // Use the exact number of colors needed
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Project Feedbacks'
          },
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Projects'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Feedbacks'
            }
          }
        }
      }
    });
  }
  

  createProjectTasksPieChart(): void {
    const projectNames = this.projectStatistics.map(stats => stats.name);
    const taskCounts = this.projectStatistics.map(stats => stats.numberOfTasks);

    new Chart('projectTasksPieChart', {
      type: 'pie',
      data: {
        labels: projectNames,
        datasets: [{
          data: taskCounts,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0',
            '#FF9800', '#03A9F4', '#E91E63', '#4CAF50', '#9E9E9E'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Number of Tasks per Project'
          }
        }
      }
    });
  }

  createProjectCompletionPercentageChart(): void {
    const data: ChartData<'doughnut'> = {
      labels: ['Completed', 'Ongoing'],
      datasets: [{
        data: [this.percentageOfCompletedTasks, 100 - this.percentageOfCompletedTasks],
        backgroundColor: ['#4CAF50', '#FFC107']
      }]
    };

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Project Completion Percentage'
        }
      }
    };

    new Chart('projectCompletionPercentageChart', {
      type: 'doughnut',
      data,
      options
    });
  }

  createTaskCompletionRateChart(): void {
    // Log the completion rate to check its value
    console.log('Task Completion Rate:', this.taskCompletionRate);
  
    // Handle edge cases where taskCompletionRate might be undefined or NaN
    const completionRate = this.taskCompletionRate !== undefined ? this.taskCompletionRate : 0;
  
    const data: ChartData<'doughnut'> = {
      labels: ['Completed', 'Pending'],
      datasets: [{
        data: [completionRate, 100 - completionRate],
        backgroundColor: ['#FF9800', '#9E9E9E']
      }]
    };
  
    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Task Completion Rate'
        }
      }
    };
  
    new Chart('taskCompletionRateChart', {
      type: 'doughnut',
      data,
      options
    });
  }
  

  navigateToImp() {
    this.router.navigate(['/pages/agile/dashASD']);
  }
}
