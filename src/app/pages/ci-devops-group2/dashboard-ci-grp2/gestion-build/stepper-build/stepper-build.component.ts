import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../../../../core/services/cig2_services/project.service';
import { Project } from '../../../../../core/models/Cig2_models/project.model';

@Component({
  selector: 'ngx-stepper-build',
  templateUrl: './stepper-build.component.html',
  styleUrls: ['./stepper-build.component.scss']
})
export class StepperBuildComponent implements OnInit {
  projectId: string;
  project: Project;


  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,

  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;
  }


  redirectToViewDashboard(): void {
    this.router.navigate(['/pages/agile/ci-devops-group2/viewdashboard', this.projectId]);
  }
}
