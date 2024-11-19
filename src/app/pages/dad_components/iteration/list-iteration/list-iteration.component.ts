import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { AddIterationComponent } from '../add-iteration/add-iteration.component';
import { ListFeaturesIterationComponent } from '../list-features-iteration/list-features-iteration.component';
import { EditIterationComponent } from '../edit-iteration/edit-iteration.component';
import { IterationService } from '../../../../core/services/dad_services/iteration.service';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';

@Component({
  selector: 'ngx-list-iteration',
  templateUrl: './list-iteration.component.html',
  styleUrls: ['./list-iteration.component.scss']
})
export class ListIterationComponent implements OnInit {
  projectId?: any;
  listIterations?: any[];
  selectedItem: any = null;

  constructor(
    private iterationService: IterationService,
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private featureService: FeatureService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService

  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.showIteration();
  }

  showIteration() {
    this.iterationService.getAll(this.projectId).subscribe(
      (data) => {
        this.listIterations = data;

        // Charger les features pour chaque itération
        this.listIterations.forEach(iteration => {
          this.featureService.getByIteration(iteration.iterationId).subscribe(
            (features) => {
              iteration.features = features;  // Assigner les features à l'itération
            },
            (error) => {
              console.error('Erreur lors de la récupération des features pour l\'itération', iteration.iterationId, error);
            }
          );
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des itérations', error);
      }
    );
  }


  openWindowAdd() {
    const windowRef = this.windowService.open(AddIterationComponent, {
      title: 'Add iteration',
      context: {
        projectId: this.projectId,
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data) {
        this.listIterations.push(data); // Update the list of objectives with the new data
      }
    });
  }

  openListFeatures(iterationId) {
    console.log(iterationId)
    const windowRef = this.windowService.open(ListFeaturesIterationComponent, {
      title: 'Select features',
      context: {
        projectId: this.projectId,
        iterationId: iterationId
      },
    });

    windowRef.onClose.subscribe(data => {
      this.showIteration()
    });
  }

  openWindowDetailsIteration(iteration) {
    const windowRef = this.windowService.open(EditIterationComponent, {
      title: 'Iteration details',
      context: {
        projectId: this.projectId,
        iteration: iteration
      },
    });

    windowRef.onClose.subscribe(data => {
      if (data) {
        if (data.deleted) {
          this.listIterations = this.listIterations.filter(obj => obj.iterationId !== data.iterationId);
        } else {
          this.showIteration();
        }
      }
    });
  }

  onSelect(item: any): void {
    this.selectedItem = item;
  }

  deselectItem() {
    this.selectedItem = null;
  }

  unassignFeature(feature) {
    if (confirm("Are you sure you want to unassign this feature?")) {
      this.featureService.Unassign(feature).subscribe(
        (data) => {
          this.showIteration();
          this.toastrService.success('Feature unassigned successfully!', 'Success');
        },
        (error) => {
          this.toastrService.danger('Failed to unassign the feature.', 'Error');
        }
      );
    }
  }


}
