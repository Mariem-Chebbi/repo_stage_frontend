import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';

@Component({
  selector: 'ngx-assign-release',
  templateUrl: './assign-release.component.html',
  styleUrls: ['./assign-release.component.scss']
})
export class AssignReleaseComponent implements OnInit, AfterViewInit {

  sourceProducts: any[];

  targetProducts: any[];
  projectId: string;
  featureList: any[]



  constructor(
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig

  ) {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id'); // No conversion needed for string IDs
    });
  }

  ngOnInit(): void {
    this.featureList = [
      { title: 'Feature 1', category: 'Category 1', price: 10, inventoryStatus: 'InStock' },
      { title: 'Feature 2', category: 'Category 2', price: 20, inventoryStatus: 'OutOfStock' },
      { title: 'Feature 3', category: 'Category 1', price: 30, inventoryStatus: 'LowStock' },
      { title: 'Feature 4', category: 'Category 3', price: 40, inventoryStatus: 'InStock' },
      { title: 'Feature 5', category: 'Category 2', price: 50, inventoryStatus: 'InStock' }
    ];

    this.targetProducts = [
      { title: 'Feature 6', category: 'Category 3', price: 60, inventoryStatus: 'InStock' },
      { title: 'Feature 7', category: 'Category 1', price: 70, inventoryStatus: 'OutOfStock' }
    ];
    /* this.showFeatures();
    this.targetProducts = [];
    this.primengConfig.ripple = true; */
  }

  ngAfterViewInit(): void {
    //this.showFeatures();
  }

  showFeatures() {
    this.featureService.getAll(this.projectId).subscribe(
      (data) => {
        this.featureList = data
        console.log(data)
      }
    )
  }

  onAssignToRelease(item) {
    console.log(item)
  }
}
