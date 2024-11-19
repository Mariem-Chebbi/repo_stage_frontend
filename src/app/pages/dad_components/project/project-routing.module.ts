import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ListProjectComponent } from './list-project/list-project.component';

const routes: Routes = [{
    path: 'agile/dad/project',
    component: ProjectComponent,
    children: [
        { path: 'add', component: AddProjectComponent },
        { path: 'list', component: ListProjectComponent }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectRoutingModule { }

export const routedComponents = [
    AddProjectComponent,
    ListProjectComponent,
    ProjectComponent
];
