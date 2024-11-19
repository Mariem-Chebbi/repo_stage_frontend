import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../../../../core/FDDG2_Services/features.service';
import { Feature, State } from '../../../../core/FDDG2_Models/feature';
import { User } from '../../../../core/FDDG2_Models/user';
import { Tasks } from '../../../../core/FDDG2_Models/tasks';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  sourceFeatures: Feature[] = []; // Features to do
  targetFeatures: Feature[] = []; // Features Completed
  displayDialog: boolean = false; // Control visibility of the dialog
  id: string;
  newFeature: Feature = {
    name: '', description: '', progress: 0, subFeatures: [], state: State.ToDo,
    expanded: true
  };

  constructor(private featuresService: FeaturesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadFeatures();
    this.loadUsers();
    console.log(this.users)

  }

  loadFeatures() {
    this.featuresService.getProjectFeatures(this.id).subscribe(data => {
      console.log(data)
      this.sourceFeatures = data.filter(f => f.state === State.ToDo);
      this.targetFeatures = data.filter(f => f.state === State.Completed);
    });
  }

  onTransfer(event: any) {
    event.items.forEach((item: Feature) => {
      // Determine the new state based on the current source of the drag
      const newState = event.from === this.sourceFeatures ? State.Completed : State.ToDo;
      if (item.state !== newState) {
        item.state = newState;
        this.updateFeatureState(item);
      }
    });
  }



  showDialogToAdd() {
    // Reset the newFeature object
    this.newFeature = { name: '', description: '', progress: 0, subFeatures: [], state: State.ToDo, expanded: true };
    this.displayDialog = true;
  }

  addFeature() {
    this.featuresService.addFeature(this.newFeature, this.id).subscribe({
      next: (feature: Feature) => {
        // Initialize the feature's subFeatures if it's not already initialized
        if (!feature.subFeatures) {
          feature.subFeatures = [];
        }

        this.newFeature.subFeatures.forEach(sub => {
          sub.featureId = feature.id; // Now safely set the id
          this.addSubFeature(sub, feature.id);
          feature.subFeatures.push(sub);
          console.log(sub)
        });

        if (feature.state === State.ToDo) {
          this.sourceFeatures.push(feature);
        } else {
          this.targetFeatures.push(feature);
        }

        this.displayDialog = false;
      },
      error: (error) => console.error('Error adding feature', error)

    });
  }


  addSubFeature(subFeature: Tasks, featureId: any) {
    console.log('Adding sub-feature:', subFeature, 'to feature:', featureId);
    this.featuresService.addsubFeature(subFeature, featureId).subscribe({
      next: (res) => console.log("Sub-Feature added:", res),
      error: (error) => console.error("Error adding sub-feature", error)
    });
  }
  addSubFeatureTemplate() {
    this.newFeature.subFeatures.push({
      taskId: new Date().getTime().toString(),
      taskName: '',
      description: '',
      userId: '',
      assignemnt: '',
      assignemntUrl: '',
      createdAt: '',
      deadline: '',
      status: State.ToDo
    });
  }

  removeSubFeature(index: number) {
    this.newFeature.subFeatures.splice(index, 1);
  }

  updateFeatureProgress(feature: Feature) {
    console.log('Updating feature progress for:', feature);
    this.featuresService.updateFeature(feature).subscribe({
      next: () => {
        console.log('Feature progress updated successfully for feature:', feature.id);
      },
      error: (error) => console.error('Error updating feature progress', error)
    });
  }


  updateFeatureState(feature: Feature) {
    this.featuresService.updateFeature(feature).subscribe({
      next: () => {
        console.log('State updated successfully');
      },
      error: (error) => console.error('Error updating feature state', error)
    });
  }

  onMoveToTarget(event: any) {
    event.items.forEach((item: Feature) => {
      item.state = State.Completed; // Set state to Completed
      this.updateFeatureState(item); // Persist this state change
    });
  }

  onMoveToSource(event: any) {
    event.items.forEach((item: Feature) => {
      item.state = State.ToDo; // Set state back to ToDo
      this.updateFeatureState(item); // Persist this state change
    });
  }

  toggleFeature(feature: Feature) {
    feature.expanded = !feature.expanded;
    if (feature.expanded && feature.subFeatures?.length === 0) {
      this.loadSubFeaturesForFeature(feature);
    }
  }

  loadSubFeaturesForFeature(feature: Feature) {
    if (!feature.subFeatures) {
      this.featuresService.getSubFeaturesForFeature(feature.id).subscribe(
        subFeatures => {
          feature.subFeatures = subFeatures;
        },
        error => console.error('Error loading sub-features:', error)
      );
    }
  }
  users: User[] = [];

  loadUsers() {
    this.featuresService.getAllusers().subscribe(data => {
      this.users = data;
      console.log(data)
    }, error => console.error('Error loading users:', error));
  }
  assignUserToSubFeature(subFeature: Tasks) {
    if (subFeature.userId) {
      const user = this.users.find(u => u.id === subFeature.userId);
      if (user) {
        subFeature.user = user; // Assign the found user object to the subFeature

        // Call the update function to send the updated subFeature to the server
        this.featuresService.updateSubFeature(subFeature).subscribe(
          response => {
            console.log("Sub-Feature updated successfully with new user:", response);
            // Additional actions upon successful update can be performed here
          },
          error => {
            console.error("Error updating sub-feature", error);
          }
        );
      } else {
        console.error('User with id ' + subFeature.userId + ' not found');
      }
    } else {
      console.error('No userId specified for the subFeature');
    }
  }

  navigateToPendings() {
    this.router.navigate(["/pages/agile/PM/pendingTasks"])
  }






}