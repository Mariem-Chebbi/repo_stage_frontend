import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ReleaseService } from '../../../../core/services/dad_services/release.service';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';

@Component({
  selector: 'ngx-details-release',
  templateUrl: './details-release.component.html',
  styleUrls: ['./details-release.component.scss']
})
export class DetailsReleaseComponent implements OnInit {

  releaseId: string;
  releaseDetails: any;
  featureList: any[];
  selectedItem: any = null;
  projectId: string;
  newItem: any = {};
  showNewItemInput: boolean = false;
  positions = NbGlobalPhysicalPosition;

  constructor(
    private route: ActivatedRoute,
    private releaseService: ReleaseService,
    private featureService: FeatureService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.releaseId = params.get('releaseid');
      this.projectId = params.get('projectid');
    });
    this.getReleaseDetails();
    this.getFeatureByRelease();
  }

  getReleaseDetails() {
    this.releaseService.getById(this.releaseId).subscribe(
      (data) => {
        this.releaseDetails = data;
      },
      (error) => {
        console.error('Error fetching release details', error);
      }
    );
  }

  getFeatureByRelease() {
    this.featureService.getByRelease(this.releaseId).subscribe(
      (data) => {
        this.featureList = data
      }
    )
  }

  onSelect(item: any): void {
    this.selectedItem = item;
  }

  deselectItem() {
    this.selectedItem = null;
  }

  getSeverity(item) {
    switch (item.status) {
      case 'To do':
        return 'info';

      case 'In progress':
        return 'warning';

      case 'Done':
        return 'success';

      default:
        return null;
    }
  }

  showInput() {
    this.showNewItemInput = true;
    this.newItem = '';
  }

  cancelNewItem() {
    this.newItem = '';
    this.showNewItemInput = false;
  }

  onRelease() {
    console.log(this.releaseDetails)
    this.releaseDetails.status = 'Released'
    this.releaseService.edit(this.releaseDetails).subscribe(
      (data) => {
        this.releaseDetails = data
        this.showToast(this.positions.BOTTOM_LEFT, 'info')
      }
    )
  }

  onUnrelease() {
    console.log(this.releaseDetails)
    this.releaseDetails.status = 'Unreleased'
    this.releaseService.edit(this.releaseDetails).subscribe(
      (data) => {
        this.releaseDetails = data
        this.showToast(this.positions.BOTTOM_LEFT, 'info')
      }
    )
  }

  showToast(position, status) {
    this.toastrService.show(status || 'Success', `Release`, { position, status });
  }
}
