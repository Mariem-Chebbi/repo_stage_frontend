import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecuterComponent } from './executer.component';
import { DashboardComponent } from '../project-manager/dashboard/dashboard.component';
import { ExdashboardComponent } from './exdashboard/exdashboard.component';
import { AffectedTasksComponent } from './affected-tasks/affected-tasks.component';
import { AssignementPageComponent } from './assignement-page/assignement-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExecuterComponent,
    children: [
      {
        path: 'dashboard',
        component: ExdashboardComponent,
      },
      {
        path: 'affectedTasks',
        component: AffectedTasksComponent,
      },
      {
        path: 'assignment/:id',
        component: AssignementPageComponent,
      },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecuterRoutingModule { }
