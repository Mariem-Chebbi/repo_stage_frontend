import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../../../core/models/service/feedback.service';
import { ProjectService } from '../../../../core/models/service/project.service';
import { Project } from '../../../../core/models/Project';

@Component({
  selector: 'app-create-feedback-dialog',
  templateUrl: './create-feedback-dialog.component.html',
  styleUrls: ['./create-feedback-dialog.component.scss']
})
export class CreateFeedbackDialogComponent implements OnInit {
  feedbackForm: FormGroup;
  projects: Project[] = [];
  imagePreviews: string[] = []; 
  images: File[] = []; 

  constructor(
    public dialogRef: MatDialogRef<CreateFeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private feedbackService: FeedbackService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      comment: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      projectId: ['', Validators.required]
    });

    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.feedbackForm.valid) {
      const formData = new FormData();
      formData.append('comment', this.feedbackForm.get('comment').value);
      formData.append('rating', this.feedbackForm.get('rating').value);

      this.images.forEach(image => {
        formData.append('images', image);
      });

      this.feedbackService.createFeedback(formData).subscribe(
        (response) => {
          const projectId = this.feedbackForm.get('projectId').value;
          this.feedbackService.assignFeedbackToProject(response.id!, projectId).subscribe(
            () => {
              this.dialogRef.close(response);
            },
            (error) => {
              console.error('Error assigning feedback to project:', error);
            }
          );
        },
        (error) => {
          console.error('Error creating feedback:', error);
        }
      );
    }
  }

  setRating(rating: number): void {
    this.feedbackForm.get('rating').setValue(rating);
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.images = Array.from(files);

    this.imagePreviews = [];
    Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

}
