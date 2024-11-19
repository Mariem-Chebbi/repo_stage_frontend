import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';
import { ReleaseService } from '../../../../core/services/dad_services/release.service';
import { TutorialService } from '../../../../core/services/dad_services/tutorial.service';
import { ObjectiveService } from '../../../../core/services/dad_services/objective.service';

@Component({
  selector: 'ngx-list-archive',
  templateUrl: './list-archive.component.html',
  styleUrls: ['./list-archive.component.scss']
})
export class ListArchiveComponent implements OnInit {
  projectId: string;
  featureList: any[];
  releaseList: any[];
  listObjectives?: any[];
  listTutorial: any[] = [];




  constructor(
    private featureService: FeatureService,
    private releaseService: ReleaseService,
    private tutorialService: TutorialService,
    private objectiveService: ObjectiveService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService

  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id'); // No conversion needed for string IDs
    });
  }

  ngOnInit(): void {
    this.showFeatures();
    this.getAllReleases();
    this.getAllObjectives();
    this.getTutorials();
  }

  showFeatures() {
    this.featureService.getAll(this.projectId).subscribe(
      (data) => {
        this.featureList = data.filter(feature => feature.isArchived === true)
        //console.log(data)
      }
    )
  }

  getAllReleases() {
    this.releaseService.getAll(this.projectId).subscribe(
      (data) => {
        this.releaseList = data.filter(obj => obj.isArchived === true)
      },
      (error) => {
        console.error('Error fetching releases', error);
      }
    );
  }

  getAllObjectives() {
    this.objectiveService.getAll(this.projectId).subscribe(
      (data) => {
        this.listObjectives = data.filter(obj => obj.isArchived === true);
        console.log(this.listObjectives);
      }
    );
  }

  getTutorials() {
    this.tutorialService.gettutorial().subscribe(
      (data) => {
        this.listTutorial = data.filter(obj => obj.isArchived === true);
      }
    )
  }

  confirmDelete(id) {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      this.onDelete(id);
    }
  }

  onDelete(id) {
    this.featureService.archive(id).subscribe(
      (data) => {
        this.showFeatures();
        this.toastrService.danger('Feature deleted permanently', 'Delete');
      }
    )
  }

  restore(id) {
    this.featureService.restore(id).subscribe(
      (data) => {
        this.showFeatures();
        this.toastrService.primary('Feature has been restored', 'Restore');

      }
    )
  }

  onDeleteConfirm(id): void {
    if (window.confirm('Are you sure you want to delete this release?')) {
      this.releaseService.delete(id).subscribe(
        () => {
          this.getAllReleases();
          this.toastrService.danger('Release deleted permanently', 'Delete');
        }
      );
    }
  }

  restoreRelease(id) {
    this.releaseService.restore(id).subscribe(
      (data) => {
        this.getAllReleases();
        this.toastrService.primary('Release has been restored', 'Restore');

      }
    )
  }

  onDeleteConfirmTutorial(id): void {
    if (window.confirm('Are you sure you want to delete this Tutorial?')) {
      this.tutorialService.deletetutorial(id).subscribe(
        () => {
          this.getTutorials();
          this.toastrService.danger('Tutorial deleted permanently', 'Delete');

        }
      );
    }
  }

  restoreTutorial(id) {
    this.tutorialService.restore(id).subscribe(
      (data) => {
        this.getTutorials();
        this.toastrService.primary('Tutorial has been restored', 'Restore');
      }
    )
  }

  onDeleteConfirmObjective(id): void {
    if (window.confirm('Are you sure you want to delete this objective?')) {
      this.objectiveService.delete(id).subscribe(
        () => {
          this.getAllObjectives();
          this.toastrService.danger('Objective deleted permanently', 'Delete');

        }
      );
    }
  }

  restoreObjective(id) {
    this.objectiveService.restore(id).subscribe(
      (data) => {
        this.getAllObjectives();
        this.toastrService.primary('Objective has been restored', 'Restore');

      }
    )
  }


}
