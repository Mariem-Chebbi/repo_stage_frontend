import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../../../../core/models/service/project.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm: FormGroup;
  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['Not Started', 'In Progress', 'Completed'];

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onCreate(): void {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      this.projectService.createProject(newProject).subscribe(
        (response) => {
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating project', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}