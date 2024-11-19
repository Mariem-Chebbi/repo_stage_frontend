import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbOptionModule,
  NbRadioModule,
  NbStepperModule,
  NbTabsetModule,
  NbDatepickerModule,
  NbListModule,
  NbSelectModule,
  NbUserModule,
  NbWindowModule,
  NbToastrModule
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ScrumPokerGroup2Component } from './scrum-poker-group2/scrum-poker-group2.component';
import { ScrumPokerG2DemodModule } from './scrum-poker-group2/scrum-poker-g2-demo/scrum-poker-g2-demo.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { SAFeMethodologieRoutingModule } from './safe-methodologie/safe-methodologie-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SafeProcessComponent } from './safe-methodologie/safe-process/safe-process.component';
import { SprintDetailsComponent } from './safe-methodologie/sprint-details/sprint-details.component';
import { TaskChartsComponent } from './safe-methodologie/charts/task-charts/task-charts.component';
import { SprintChartsComponent } from './safe-methodologie/charts/sprint-charts/sprint-charts.component';
import { SafeMethodologiePresentationComponent } from './safe-methodologie/safe-methodologie-presentation/safe-methodologie-presentation.component';
import { UpdateDemoComponent } from './safe-methodologie/update-demo/update-demo.component';
import { FeaturesModule } from './dad_components/features/features.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { TagModule } from 'primeng/tag';
import { ReleaseModule } from './dad_components/release/release.module';
import { ChartsModule } from './charts/charts.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';
import { DadStepsComponent } from './dad_components/dad-steps/dad-steps.component';
import { ListObjectifsComponent } from './dad_components/objectifs/list-objectifs/list-objectifs.component';
import { ListUsersComponent } from './dad_components/users/list-users/list-users.component';
import { FormObjectifsComponent } from './dad_components/objectifs/form-objectifs/form-objectifs.component';
import { EditFormObjectifsComponent } from './dad_components/objectifs/edit-form-objectifs/edit-form-objectifs.component';
import { AddFormUserComponent } from './dad_components/users/add-form-user/add-form-user.component';
import { CreateTeamFormComponent } from './dad_components/users/create-team-form/create-team-form.component';
import { DetailsUserComponent } from './dad_components/users/details-user/details-user.component';
import { ListIterationComponent } from './dad_components/iteration/list-iteration/list-iteration.component';
import { AddIterationComponent } from './dad_components/iteration/add-iteration/add-iteration.component';
import { ListFeaturesIterationComponent } from './dad_components/iteration/list-features-iteration/list-features-iteration.component';
import { ListArchiveComponent } from './dad_components/archives/list-archive/list-archive.component';
import { EditIterationComponent } from './dad_components/iteration/edit-iteration/edit-iteration.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dad_components/dashboard/dashboard.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ECommerceModule,
    MiscellaneousModule,
    FeaturesModule,
    NbListModule,
    NbUserModule,
    NbEvaIconsModule,
    TagModule,
    NbToastrModule.forRoot(),
    ReleaseModule,
    ChartsModule,
    NbDatepickerModule,
    ScrumPokerG2DemodModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbOptionModule,
    NbRadioModule,
    NbSelectModule,
    NbButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NbLayoutModule,
    NbAccordionModule,
    NbIconModule,
    NbStepperModule,
    NbTabsetModule,
    NbWindowModule,
    //NbWindowModule.forChild(),
    SAFeMethodologieRoutingModule,
    DragDropModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  declarations: [
    PagesComponent,
    ScrumPokerGroup2Component,
    SafeProcessComponent,
    SprintDetailsComponent,
    TaskChartsComponent,
    SprintChartsComponent,
    SafeMethodologiePresentationComponent,
    UpdateDemoComponent,
    DadStepsComponent,
    ListObjectifsComponent,
    ListUsersComponent,
    FormObjectifsComponent,
    EditFormObjectifsComponent,
    AddFormUserComponent,
    CreateTeamFormComponent,
    DetailsUserComponent,
    DashboardComponent,
    ListIterationComponent,
    AddIterationComponent,
    ListFeaturesIterationComponent,
    ListArchiveComponent,
    EditIterationComponent,
  ],
  providers: [
    BsModalService,
  ],
})
export class PagesModule {
}
