import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { Feedback } from '../../../../core/models/Feedback';
import { Project } from '../../../../core/models/Project';
import { Task } from '../../../../core/models/Task';
import { FeedbackService } from '../../../../core/models/service/feedback.service';
import { ProjectService } from '../../../../core/models/service/project.service';
import { TaskService } from '../../../../core/models/service/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archived-items',
  templateUrl: './archived-items.component.html',
  styleUrls: ['./archived-items.component.scss']
})
export class ArchivedItemsComponent implements OnInit {
  archivedItems = new MatTableDataSource<Feedback>([]);
  archivedP = new MatTableDataSource<Project>([]);
  archivedT = new MatTableDataSource<Task>([]);

  displayedColumns: string[] = ['comment', 'project', 'rating', 'actions'];
  displayedProjectColumns: string[] = ['name', 'description', 'actions'];
  displayedTaskColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private feedbackService: FeedbackService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router,
    private dialog: MatDialog  // Inject MatDialog here
  ) {}

  ngOnInit(): void {
    this.loadArchivedItems();
    this.loadArchivedP();
    this.loadArchivedT();
  }

  loadArchivedItems(): void {
    this.feedbackService.getAllArchivedFeedbacks().subscribe(
      (items) => {
        this.archivedItems.data = items;
      },
      (error) => {
        console.error('Error loading archived items', error);
      }
    );
  }

  restoreItem(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.restoreFeedback(id).subscribe(
          () => {
            this.loadArchivedItems();
          },
          (error) => {
            console.error('Error restoring item', error);
          }
        );
      }
    });
  }

  deleteItem(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.deleteFeedback(id).subscribe(
          () => {
            this.loadArchivedItems(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting item', error);
          }
        );
      }
    });
  }

  loadArchivedP(): void {
    this.projectService.getAllArchivedProjects().subscribe(
      (items) => {
        this.archivedP.data = items;
      },
      (error) => {
        console.error('Error loading archived projects', error);
      }
    );
  }

  restoreP(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.restoreProject(id).subscribe(
          () => {
            this.loadArchivedP();
          },
          (error) => {
            console.error('Error restoring project', error);
          }
        );
      }
    });
  }

  deleteProject(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe(
          () => {
            this.loadArchivedP(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting project', error);
          }
        );
      }
    });
  }

  loadArchivedT(): void {
    this.taskService.getAllArchivedTasks().subscribe(
      (items) => {
        this.archivedT.data = items;
      },
      (error) => {
        console.error('Error loading archived tasks', error);
      }
    );
  }

  restoreT(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.restoreTask(id).subscribe(
          () => {
            this.loadArchivedT();
          },
          (error) => {
            console.error('Error restoring task', error);
          }
        );
      }
    });
  }

  deleteTask(id: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id).subscribe(
          () => {
            this.loadArchivedT(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting task', error);
          }
        );
      }
    });
  }

  navigateBack() {
    this.router.navigate(['/pages/agile/dashASD']);
  }
}
