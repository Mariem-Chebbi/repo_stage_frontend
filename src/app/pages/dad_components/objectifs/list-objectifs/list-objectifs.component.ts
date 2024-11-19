import { Component, OnInit } from '@angular/core';
import { NbIconLibraries, NbWindowService } from '@nebular/theme';
import { FormObjectifsComponent } from '../form-objectifs/form-objectifs.component';
import { EditFormObjectifsComponent } from '../edit-form-objectifs/edit-form-objectifs.component';
import { ActivatedRoute } from '@angular/router';
import { ObjectiveService } from '../../../../core/services/dad_services/objective.service';

@Component({
  selector: 'ngx-list-objectifs',
  templateUrl: './list-objectifs.component.html',
  styleUrls: ['./list-objectifs.component.scss']
})
export class ListObjectifsComponent implements OnInit {
  projectId?: string;
  listObjectives?: any[];

  constructor(
    iconsLibrary: NbIconLibraries,
    private windowService: NbWindowService,
    private objectiveService: ObjectiveService,
    private route: ActivatedRoute,
  ) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });

    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id');
    });
  }

  ngOnInit(): void {
    console.log(this.projectId);
    this.getAllObjectives();
  }

  getAllObjectives() {
    this.objectiveService.getAll(this.projectId).subscribe(
      (data) => {
        this.listObjectives = data.filter(obj => obj.isArchived === false);
        console.log(this.listObjectives);
      }
    );
  }

  openWindowAdd() {
    const windowRef = this.windowService.open(FormObjectifsComponent, {
      title: 'Add objective',
      context: {
        projectId: this.projectId,
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data) {
        this.listObjectives.push(data); // Update the list of objectives with the new data
      }
    });
  }

  openWindowEdit(objective) {
    const windowRef = this.windowService.open(EditFormObjectifsComponent, {
      title: 'Edit objective',
      context: {
        objective: objective,
      },
    });

    windowRef.onClose.subscribe(data => {
      if (data) {
        if (data.deleted) {
          this.listObjectives = this.listObjectives.filter(obj => obj.objectiveId !== data.objectiveId);
        } else {
          this.getAllObjectives();
        }
      }
    });
  }

  getStatus(item) {
    switch (item.isAchieved) {
      case true:
        return 'Achieved';

      case false:
        return 'Not achieved';

      default:
        return null;
    }
  };
}
