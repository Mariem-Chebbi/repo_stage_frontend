import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { AddProjectComponent } from './add-project/add-project.component';

const routes: Routes = [ {
  path: '',
  component: ProjectComponent,
  children: [
    {
      path: 'getAllProjects/:id',
      component: ListProjectComponent ,
    },
    // {
    //   path: 'ProjectDetails/:id',
    //   component: Details ,
    // },
    {
      path: 'addProject/:id',
      component: AddProjectComponent ,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
