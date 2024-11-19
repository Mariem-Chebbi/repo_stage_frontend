import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonstrationComponent } from './demonstration.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { ShowDemoComponent } from './show-demo/show-demo.component';
import { AddDemoComponent } from './add-demo/add-demo.component';
import { EditDemoComponent } from './edit-demo/edit-demo.component';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationComponent,
    children: [
      {
        path: 'alldemos',
        component: DemoListComponent ,
      },
      {
        path: 'demoDetails/:id',
        component: ShowDemoComponent ,
      },
      {
        path: 'addDemo',
        component: AddDemoComponent ,
      },
      {
        path: 'edit',
        component: EditDemoComponent ,
      },
      
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonstrationRoutingModule { }
