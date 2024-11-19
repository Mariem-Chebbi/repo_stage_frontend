import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DatepickerEditorComponent } from '../datepicker-editor/datepicker-editor.component';
import { DetailsButtonComponent } from '../details-button/details-button.component';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { AddReleaseComponent } from '../add-release/add-release.component';
import { EditReleaseComponent } from '../edit-release/edit-release.component';
import { ReleaseService } from '../../../../core/services/dad_services/release.service';


@Component({
  selector: 'ngx-list-release',
  templateUrl: './list-release.component.html',
  styleUrls: ['./list-release.component.scss']
})
export class ListReleaseComponent implements OnInit {

  projectId: string;
  releaseList: any[];

  constructor(
    private releaseService: ReleaseService,
    private route: ActivatedRoute,
    private router: Router,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService

  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id'); // No conversion needed for string IDs
    });
  }

  ngOnInit(): void {
    this.getAllReleases()
  }

  getAllReleases() {
    this.releaseService.getAll(this.projectId).subscribe(
      (data) => {
        this.releaseList = data.filter(obj => obj.isArchived === false)
      },
      (error) => {
        console.error('Error fetching releases', error);
      }
    );
  }

  onCreateConfirm(event): void {
    // Format the date fields before sending the data
    const newRelease = {
      ...event.newData,
      startDate: this.formatDate(event.newData.startDate),
      releaseDate: this.formatDate(event.newData.releaseDate),
    };

    newRelease.status = 'Unreleased'

    if (this.validateNewData(newRelease)) {
      this.releaseService.add(newRelease, this.projectId).subscribe(
        (data) => {
          event.confirm.resolve(newRelease);
          this.getAllReleases(); // Refresh the list after adding
        },
        (error) => {
          console.error('Error adding new release', error);
          event.confirm.reject();
        }
      );
    } else {
      alert('Please fill all required fields.');
      event.confirm.reject();
    }
  }


  onSaveConfirm(event): void {
    // Ensure the dates are formatted correctly before saving
    const updatedRelease = {
      ...event.newData,
      startDate: this.formatDate(event.newData.startDate),
      releaseDate: this.formatDate(event.newData.releaseDate),
    };
    console.log(updatedRelease)
    if (this.validateNewData(updatedRelease)) {
      if (window.confirm('Are you sure you want to edit?')) {
        this.releaseService.edit(updatedRelease).subscribe(
          (data) => {
            event.confirm.resolve(updatedRelease);
            this.getAllReleases(); // Refresh the list after editing
          },
          (error) => {
            console.error('Error editing release', error);
            event.confirm.reject();
          }
        );
      } else {
        event.confirm.reject();
      }
    } else {
      alert('Please fill all required fields.');
      event.confirm.reject();
    }
  }

  onDeleteConfirm(release): void {
    if (window.confirm('Are you sure you want to delete this release?')) {
      this.releaseService.archive(release.releaseId).subscribe(
        () => {
          this.getAllReleases();
        }
      )
    };
  }

  openWindowAdd() {
    const windowRef = this.windowService.open(AddReleaseComponent, {
      title: 'Add release',
      context: {
        projectId: this.projectId,
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data) {
        this.releaseList.push(data); // Update the list of objectives with the new data
      }
    });
  }

  openWindowEdit(release) {
    const windowRef = this.windowService.open(EditReleaseComponent, {
      title: 'Edit release',
      context: {
        projectId: this.projectId,
        release: release
      },
    });

    windowRef.onClose.subscribe((data) => {
      if (data) {
        this.getAllReleases(); // Update the list of objectives with the new data
      }
    });
  }




  validateNewData(release): boolean {
    return release.name !== "" && release.progres !== "" && release.startDate !== "" && release.releaseDate !== "" && release.description !== "";
  }

  parseAndFormatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString); // Make sure this date is correct
    return this.formatDate(date);
  }

  formatDate(date): string {
    if (!date) return '';
    let d: Date;

    // If date is an object and has a `toDate` method, use it
    if (typeof date === 'object' && date.toDate) {
      d = date.toDate();
    } else if (typeof date === 'string' || date instanceof Date) {
      d = new Date(date);
    } else {
      return ''; // Return empty string if the date is not a recognized format
    }

    // Check if date is valid
    if (isNaN(d.getTime())) return '';

    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  onRowClick(release): void {
    this.router.navigate([`/pages/agile/dad/release/details/${this.projectId}/${release.releaseId}`]);
  }


}
