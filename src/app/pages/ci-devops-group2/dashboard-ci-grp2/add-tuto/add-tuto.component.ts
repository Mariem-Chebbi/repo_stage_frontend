import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { TutorialService } from '../../../../core/services/cig2_services/tutorial.service';

@Component({
  selector: 'ngx-add-tuto',
  templateUrl: './add-tuto.component.html',
  styleUrls: ['./add-tuto.component.scss']
})
export class AddTutoComponent implements OnInit {
  tutorialForm: FormGroup;
  successMessage: string;

  constructor(
    private fb: FormBuilder,
    private tutorialService: TutorialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tutorialForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: ['']
    });
  }

  onSubmit(): void {
    if (this.tutorialForm.valid) {
      const newTutorial = this.tutorialForm.value;
      this.tutorialService.create(newTutorial).subscribe(
        () => {
          this.successMessage = 'Tutorial added successfully!';
          setTimeout(() => {
            this.router.navigate(['/pages/agile/ci-devops-group2']);
          }, 2000);
        },
        error => {
          console.error('Error adding tutorial:', error);
        }
      );
    }
  }
}
