import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../../../core/FDDG2_Services/tasks.service';
import { Tasks } from '../../../../../core/FDDG2_Models/tasks';

@Component({
  selector: 'ngx-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  task: Tasks | null = null;
  fileContent: SafeUrl | null = null;
  fileType: string | null = null;
  
  // Rating values
  valueResponsivity!: number;
  valueErgonomics!: number;
  valueDeadline!: number;
  valueDescriptionC!: number;
  valueTech!: number;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.fetchTask(taskId);
    }
  }

  fetchTask(taskId: string): void {
    this.tasksService.getTask(taskId).subscribe(
      (task) => {
        this.task = task;
        // Initialize the rating values with existing task data, if available
        if (task) {
          this.valueResponsivity = task.responsivity || 0;
          this.valueErgonomics = task.ergonomics || 0;
          this.valueDeadline = task.deadlineC || 0;
          this.valueDescriptionC = task.descriptionC || 0;
          this.valueTech = task.techUse || 0;
        }
        this.fetchFileContent();
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );
  }

  fetchFileContent(): void {
    if (this.task && this.task.assignemntUrl) {
      this.tasksService.getFile(this.task.assignemntUrl).subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.fileType = this.getFileType(this.task.assignemntUrl);
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }, error => {
        console.error('Error fetching file:', error);
      });
    }
  }

  getFileType(fileName: string): string {
    if (fileName.endsWith('.pdf')) return 'pdf'; 
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.jpeg')) return 'image';
    if (fileName.endsWith('.mp4') || fileName.endsWith('.webm')) return 'video';
    if (fileName.endsWith('.mp3') || fileName.endsWith('.wav')) return 'audio';
    return 'text';
  }

  // Method to update task ratings
  saveRatings(): void {
    if (this.task) {
      // Assign the rating values to the task object
      this.task.responsivity = this.valueResponsivity;
      this.task.ergonomics = this.valueErgonomics;
      this.task.deadlineC = this.valueDeadline;
      this.task.descriptionC = this.valueDescriptionC;
      this.task.techUse = this.valueTech;

      // Call the service method to update ratings
      this.tasksService.updateTaskRatings(this.task.taskId, this.task).subscribe(
        (updatedTask) => {
          console.log('Task ratings updated successfully', updatedTask);
          this.navigateBack();
        },
        (error) => {
          console.error('Error updating task ratings:', error);
        }
      );
    }
  }

  confirmTask(): void {
    if (this.task) {
      this.tasksService.confirmStatus(this.task.taskId).subscribe(
        () => {
          console.log("Task confirmed successfully");
          this.saveRatings();
          this.navigateBack();
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }

  rejectTask(): void {
    if (this.task) {
      this.tasksService.rejectStatus(this.task.taskId).subscribe(
        () => {
          console.log("Task rejected successfully");
          this.saveRatings();
          this.navigateBack();
        },
        (error) => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }

  navigateBack(): void {
    this.router.navigate(['/pages/agile/PM/pendingTasks']);
  }
}
