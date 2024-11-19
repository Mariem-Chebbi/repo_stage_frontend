import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuillModule } from 'ngx-quill';
import { NbStepperModule, NbAccordionModule, NbButtonModule, NbFormFieldModule, NbInputModule, NbIconModule, NbMenuModule, NbListModule, NbThemeModule } from '@nebular/theme';

import { AddTutoComponent } from './add-tuto/add-tuto.component';
import { DashboardCiGrp2RoutingModule } from './dashboard-ci-grp2-routing.module';
import { EditTutorialComponent } from './edit-tutorial/edit-tutorial.component';
import { BuildDetailsComponent } from './gestion-build/build-details/build-details.component';
import { BuildTriggerComponent } from './gestion-build/build-trigger/build-trigger.component';
import { SonarAnalysisComponent } from './gestion-build/sonar-analysis/sonar-analysis.component';
import { StepperBuildComponent } from './gestion-build/stepper-build/stepper-build.component';
import { PiplineAddComponent } from './gestion-pipline/pipline-add/pipline-add.component';
import { StageAddComponent } from './gestion-pipline/stage-add/stage-add.component';
import { ViewKpiComponent } from './KPI-dashboard/view-kpi/view-kpi.component';
import { ProjectAddComponent } from './project-mamagement/project-add/project-add.component';
import { ProjectDetailsComponent } from './project-mamagement/project-details/project-details.component';
import { ProjectEditComponent } from './project-mamagement/project-edit/project-edit.component';
import { ProjectMamagementComponent } from './project-mamagement/project-mamagement.component';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
   
    EditTutorialComponent,
    
   
    ViewKpiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule,
    NgxChartsModule,
    QuillModule.forRoot(),
    NbStepperModule,
    NbAccordionModule,
    NbButtonModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbMenuModule,
    NbListModule,
    NbThemeModule.forRoot({ name: 'default' }),
    DashboardCiGrp2RoutingModule
  ],
  exports: [
    
  ]
})
export class DashboardCiGrp2Module { }
