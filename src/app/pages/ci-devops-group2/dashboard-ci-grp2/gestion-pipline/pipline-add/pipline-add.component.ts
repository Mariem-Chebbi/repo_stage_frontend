import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Stage } from '../../../../../core/models/Cig2_models/stage.model';
import { PipelineService } from '../../../../../core/services/cig2_services/pipeline.service';
import { StageService } from '../../../../../core/services/cig2_services/stage.service';

@Component({
  selector: 'ngx-pipline-add',
  templateUrl: './pipline-add.component.html',
  styleUrls: ['./pipline-add.component.scss']
})
export class PiplineAddComponent implements OnInit {
  pipelineForm: FormGroup;
  stages: Stage[] = [];

  constructor(
    private fb: FormBuilder,
    private pipelineService: PipelineService,
    private stageService: StageService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.pipelineForm = this.fb.group({
      name: ['', Validators.required],
      stageIds: [[], Validators.required] // Initialisation avec tableau vide et validation requise
    });
  }

  ngOnInit(): void {
    this.loadStages();
  }

  loadStages(): void {
    this.stageService.getAllStages().subscribe(
      (data) => this.stages = data,
      (error) => console.error('Erreur lors du chargement des stages', error)
    );
  }

  onSubmit(): void {
    if (this.pipelineForm.valid) {
      const pipeline = this.pipelineForm.value;
      this.pipelineService.createPipeline(pipeline).subscribe(
        (response) => {
          this.toastrService.success('Pipeline créé avec succès', 'Succès');
          this.router.navigate(['/pipelines']);
        },
        (error) => {
          console.error('Erreur lors de la création du pipeline', error);
          this.toastrService.danger('Erreur lors de la création du pipeline', 'Erreur');
        }
      );
    }
  }
}
