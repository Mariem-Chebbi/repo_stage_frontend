import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../../../core/FDDG2_Services/tasks.service';

@Component({
  selector: 'ngx-assignement-page',
  templateUrl: './assignement-page.component.html',
  styleUrls: ['./assignement-page.component.scss']
})
export class AssignementPageComponent implements OnInit {
  selectedFile: File | null = null;
  taskId: string;
  fileContent: SafeUrl | string | null = null;
  fileType: string | null = null;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private taskservice: TasksService) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id'); // Get the ID from the route
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files.length) {
      return;
    }

    this.selectedFile = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;

      if (this.selectedFile.type === 'application/pdf') {
        this.fileType = 'pdf';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else if (this.selectedFile.type.startsWith('text/')) {
        this.fileType = 'text';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else if (this.selectedFile.type.startsWith('image/')) {
        this.fileType = 'image';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else if (this.selectedFile.type.startsWith('video/')) {
        this.fileType = 'video';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else if (this.selectedFile.type.startsWith('audio/')) {
        this.fileType = 'audio';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else if (this.selectedFile.name.endsWith('.drawio')) {
        this.fileType = 'drawio';
        this.fileContent = this.sanitizer.bypassSecurityTrustResourceUrl(content);
      } else {
        this.fileType = 'unsupported';
        this.fileContent = null;
      }
      console.log(this.fileContent);
    };

    if (this.selectedFile.type === 'application/pdf' || 
        this.selectedFile.type.startsWith('image/') || 
        this.selectedFile.type.startsWith('video/') || 
        this.selectedFile.type.startsWith('audio/')) {
      reader.readAsDataURL(this.selectedFile);
    } else {
      reader.readAsText(this.selectedFile);
    }
  }

  onSubmit(): void {
    this.router.navigate(['/pages/agile/executer/affectedTasks']); // Navigate to the detail page
    // Update the status to "Pending"
    this.updateTaskStatus(this.taskId, 'Pending');
    console.log(this.taskId);
    console.log('File submitted. Task status updated to Pending.');
  }

  updateTaskStatus(taskId: string, newStatus: string): void {
    // Implement status update logic if necessary
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.taskservice.uploadFile(this.taskId, this.selectedFile).subscribe(
        response => {
          console.log('File uploaded successfully', response);
          this.updateTaskStatus(this.taskId, 'Pending');
          this.router.navigate(['/pages/agile/executer/affectedTasks']);
        },
        error => {
          console.error('Error uploading file', error);
        }
      );
    }
  }
}
