import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddTutorialComponent } from './add-tutorial/add-tutorial.component';
import { GuideComponent } from './show-tutorial/guide.component';
import { GuideeComponent } from './guidee.component';

const routes: Routes = [{
    path: '',
    component: GuideeComponent,
    children: [
        { path: 'agile/dad', component: GuideComponent },
        { path: 'agile/dad/add-tutorial', component: AddTutorialComponent }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GuideRoutingModule { }

export const routedComponents = [
    AddTutorialComponent,
    GuideComponent,
    GuideeComponent
];
