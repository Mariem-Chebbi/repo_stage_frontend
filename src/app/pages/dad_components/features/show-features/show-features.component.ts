import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeatureService } from '../../../../core/services/dad_services/feature.service';

@Component({
  selector: 'ngx-show-features',
  templateUrl: './show-features.component.html',
  styleUrls: ['./show-features.component.scss']
})
export class ShowFeaturesComponent implements OnInit {
  products: any[];
  items: string[] = ['Item 1', 'Item 2', 'Item 3'];
  newItem: any = {};
  showNewItemInput: boolean = false;
  projectId: string;
  featureList: any[]
  addForm: FormGroup;
  feature: any = {};
  selectedItem: any = null;



  constructor(
    private featureService: FeatureService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,

  ) {

    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id'); // No conversion needed for string IDs
    });

  }

  ngOnInit(): void {
    this.showFeatures();



    this.addForm = this.fb.group({
      title: [this.feature.title, Validators.required],
    });


  }

  showFeatures() {
    this.featureService.getAll(this.projectId).subscribe(
      (data) => {
        this.featureList = data.filter(feature => feature.isArchived === false)
        //console.log(data)
      }
    )
  }

  addFeatures() {

    this.feature = this.addForm.value
    this.feature.status = "To do"
    this.featureService.add(this.feature, this.projectId).subscribe(
      (data) => {
        this.newItem = '';
        this.showNewItemInput = false;
        this.showFeatures();
        //console.log("success !")
      }
    )
  }

  showInput() {
    this.showNewItemInput = true;
    this.newItem = '';
  }

  saveNewItem() {
    if (this.newItem.trim()) {
      this.items.push(this.newItem);
      this.newItem = '';
      this.showNewItemInput = false;
    }
  }

  cancelNewItem() {
    this.newItem = '';
    this.showNewItemInput = false;
  }

  onReorder(event) {
    // Handle reordering logic here
  }

  goToReleaseBacklog() {
    this.router.navigate(['/pages/agile/dad/release/list/' + this.projectId]);
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
  };

}
