import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectServiceService } from '../../../../../core/FDDG2_Services/project-service.service';
import { Project } from '../project-class/models/project';

@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  wsId: string = ''; // Initialize workspace ID
  projectForm: FormGroup;

  constructor(
    private projectService: ProjectServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.wsId = this.projectService.getWorkspaceId(); // Set or retrieve workspace ID as needed
    this.initForm();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addProjectToWorkspace(): void {
    if (this.wsId && this.projectForm.valid) {
      const newProject: Project = this.projectForm.value;
      
      console.log('Form Values:', newProject); // Check the form values here
      this.projectService.addProjectToWorkspace(this.wsId, newProject).subscribe(
        (project) => {
          console.log('Project added successfully:', project);
          this.projectForm.reset(); // Reset the form after successful submission
        },
        (error) => console.error('Error adding project:', error)
      );
    } else {
      console.error('Workspace ID or form data is not available.');
    }
  }
}
