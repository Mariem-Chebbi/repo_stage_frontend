import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkSpaceRoutingModule } from './work-space-routing.module';

import { AddWorkSpaceComponent } from './add-work-space/add-work-space.component';
import { EditWorkSpaceComponent } from './edit-work-space/edit-work-space.component';

import { ListWorkSpaceComponent } from './list-work-space/list-work-space.component';
import { DetailsWorkSpaceComponent } from './details-work-space/details-work-space.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

    AddWorkSpaceComponent,
    EditWorkSpaceComponent,

    ListWorkSpaceComponent,
    DetailsWorkSpaceComponent
  ],
  imports: [
    CommonModule,
    WorkSpaceRoutingModule,
    ReactiveFormsModule
  ]
})
export class WorkSpaceModule { }
