import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';
import { IterationService } from '../../../../core/services/dad_services/iteration.service';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';


@Component({
  selector: 'ngx-list-features-iteration',
  templateUrl: './list-features-iteration.component.html',
  styleUrls: ['./list-features-iteration.component.scss']
})
export class ListFeaturesIterationComponent implements OnInit {

  projectId?: any;
  iterationId?: any;
  listFeatures?: any[] = [];

  constructor(
    protected windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private iterationService: IterationService,
    private featureService: FeatureService,

  ) { }

  ngOnInit(): void {
    this.projectId = this.windowRef.config.context['projectId'];
    this.iterationId = this.windowRef.config.context['iterationId'];

    this.showFeatures();
  }

  showFeatures() {
    this.featureService.getAll(this.projectId).subscribe(
      (data) => {
        this.listFeatures = data.filter(feature => feature.iteration === null);
      }
    )
  }

  assignSelectedFeatures() {
    const selectedFeatures = this.listFeatures
      .filter((feature) => feature.selected); // Assuming featureId is used to identify features

    if (selectedFeatures.length > 0) {
      this.featureService.assign(selectedFeatures, this.iterationId).subscribe(
        (response) => {
          this.toastrService.success('Features assigned successfully!', 'Success');
          this.showFeatures();  // Refresh the list after assigning
        },
        (error) => {
          this.toastrService.danger('Failed to assign features.', 'Error');
        }
      );
    } else {
      this.toastrService.warning('No features selected.', 'Warning');
    }
  }

}
