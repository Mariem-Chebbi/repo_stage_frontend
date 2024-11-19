import { NgModule } from '@angular/core';
import { AgileComponent } from './agile.component';

import { FeaturesComponent } from './features/features.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: AgileComponent,
    children: [
      {
        path: 'demo',
        loadChildren: () => import('./demonstration/demonstration.module')
          .then(m => m.DemonstrationModule),
      },
      {

        path: 'workspace',
        loadChildren: () => import('./work-space/work-space.module')
          .then(m => m.WorkSpaceModule),
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module')
          .then(m => m.ProjectModule),
      },
      {
        path: 'executer',
        loadChildren: () => import('./executer/executer.module')
          .then(m => m.ExecuterModule),
      },
      {
        path: 'PM',
        loadChildren: () => import('./project-manager/project-manager.module')
          .then(m => m.ProjectManagerModule),
      },
      {
        path: 'login',
        component: LoginComponent ,
      },
      {
        path: 'features/:id',
        component: FeaturesComponent,

      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgileRoutingModule { }
