import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditTutorialComponent } from './edit-tutorial/edit-tutorial.component';
import { AddTutoComponent } from './add-tuto/add-tuto.component';
import { ProjectMamagementComponent } from './project-mamagement/project-mamagement.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'add-tuto', component: AddTutoComponent },
  { path: 'edit-tutorial/:id', component: EditTutorialComponent } , // Définition de la route pour l'ajout de tutoriel

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardCiGrp2RoutingModule { }
