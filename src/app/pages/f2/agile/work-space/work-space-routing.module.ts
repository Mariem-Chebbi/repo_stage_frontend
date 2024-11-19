import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkSpaceComponent } from './work-space.component';
import { ListWorkSpaceComponent } from './list-work-space/list-work-space.component';
import { DetailsWorkSpaceComponent } from './details-work-space/details-work-space.component';
import { AddWorkSpaceComponent } from './add-work-space/add-work-space.component';




const routes: Routes = [
  {
    path: '',
    component: WorkSpaceComponent,
    children: [
      {
        path: 'getAllWS',
        component: ListWorkSpaceComponent ,
      },
      {
        path: 'WSDetails/:id',
        component: DetailsWorkSpaceComponent ,
      },
      {
        path: 'addWS',
        component: AddWorkSpaceComponent ,
      },
      
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class WorkSpaceRoutingModule { }
