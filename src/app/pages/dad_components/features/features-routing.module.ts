import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { ShowFeaturesComponent } from './show-features/show-features.component';


const routes: Routes = [{
    path: 'features',
    component: FeaturesComponent,
    children: [
        { path: 'list/:id', component: ShowFeaturesComponent },
        
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FeaturesRoutingModule { }

export const routedComponents = [
    ShowFeaturesComponent,
    FeaturesComponent
];
