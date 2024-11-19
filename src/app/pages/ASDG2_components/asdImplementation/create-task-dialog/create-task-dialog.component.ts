import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../core/models/Project';
import { TaskService } from '../../../../core/models/service/task.service';
import { ProjectService } from '../../../../core/models/service/project.service';


@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  statuses: string[] = ['To Do', 'In Progress', 'Done'];
  priorities: string[] = ['Low', 'Medium', 'High'];
  projects: Project[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService // Inject ProjectService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
      completionDate: ['', Validators.required],
      projectId: ['', Validators.required] // Add projectId field
    });

    // Load projects
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.getRawValue();
      this.taskService.createTask(newTask).subscribe(
        (response) => {
          this.taskService.assignTaskToProject(response.id!, newTask.projectId).subscribe(
            () => {
              this.dialogRef.close(response);
            },
            (error) => {
              console.error('Error assigning task to project:', error);
            }
          );
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
