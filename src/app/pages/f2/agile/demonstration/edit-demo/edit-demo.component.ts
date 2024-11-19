import { Component, OnInit, ViewChild } from '@angular/core';
import { DemonstrationService } from '../../../../../core/FDDG2_Services/demonstration.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import { animate, style, transition, trigger } from '@angular/animations';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbWindowService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Demonstration } from '../../../../../core/FDDG2_Models/demonstration';

@Component({
  selector: 'ngx-edit-demo',
  templateUrl: './edit-demo.component.html',
  styleUrls: ['./edit-demo.component.scss'],
  
})
export class EditDemoComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
}
