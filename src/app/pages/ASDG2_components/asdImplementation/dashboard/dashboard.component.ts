import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { CreateFeedbackDialogComponent } from '../create-feedback-dialog/create-feedback-dialog.component';

import { ProjectDetailsDialogComponent } from '../project-details-dialog/project-details-dialog.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Project } from '../../../../core/models/Project';
import { Feedback } from '../../../../core/models/Feedback';
import { ProjectService } from '../../../../core/models/service/project.service';
import { TaskService } from '../../../../core/models/service/task.service';
import { FeedbackService } from '../../../../core/models/service/feedback.service';
import { Task } from '../../../../core/models/Task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];
  feedbacks: Feedback[] = [];
  feedbackSearchTerm: any;
  projectSearchTerm: any;
  taskSearchTerm: any;
  selectedTab: number = 0; // Initialize to the first tab
  

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private feedbackService: FeedbackService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadFeedbacks();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data || []; // Ensure an empty array if null
      },
      (error) => {
        console.error('Error loading projects', error);
        this.projects = []; // Fallback to empty array
      }
    );
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data) => {
        this.tasks = data || []; // Ensure an empty array if null
      },
      (error) => {
        console.error('Error loading tasks', error);
        this.tasks = []; // Fallback to empty array
      }
    );
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data || []; // Ensure an empty array if null
      },
      (error) => {
        console.error('Error loading feedbacks', error);
        this.feedbacks = []; // Fallback to empty array
      }
    );
  }

  viewProjectDetails(project: Project): void {
    this.dialog.open(ProjectDetailsDialogComponent, {
      width: '400px',
      data: project
    });
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    return status.replace(/\s+/g, '-').toLowerCase();
  }

  archiveFeedback(feedback: Feedback): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { message: 'Do you really want to archive this feedback?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.archiveFeedback(feedback.id).subscribe(() => {
          this.loadFeedbacks(); // Reload the list to reflect changes
        });
      }
    });
  }

  archiveProject(project: Project): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { message: 'Do you really want to archive this project?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.archiveProject(project.id).subscribe(() => {
          this.loadProjects(); // Reload the list to reflect changes
        });
      }
    });
  }

  archiveTask(task: Task): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { message: 'Do you really want to archive this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.archiveTask(task.id).subscribe(() => {
          this.loadTasks(); // Reload the list to reflect changes
        });
      }
    });
  }

  deleteProject(project: Project): void {
    this.projectService.deleteProject(project.id).subscribe(() => {
      this.loadProjects();
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteFeedback(feedback: Feedback): void {
    this.feedbackService.deleteFeedback(feedback.id).subscribe(() => {
      this.loadFeedbacks();
    });
  }

  navigateToStat() {
    this.router.navigate(['/pages/agile/dashASD/stat']);
  }

  navigateArchive() {
    this.router.navigate(['/pages/agile/dashASD/archived-items']);
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjects();
      }
    });
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openCreateFeedbackDialog(): void {
    const dialogRef = this.dialog.open(CreateFeedbackDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFeedbacks();
      }
    });
  }
}
