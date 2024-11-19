import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { ProjectManagerComponent } from './project-manager.component';
import { AssignmentsComponent } from './assignments/assignments.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManagerComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'pendingTasks',
        component: PendingTasksComponent,
      },
      {
        path: 'assignments/:id',
      component: AssignmentsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagerRoutingModule { }
