import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgileRoutingModule } from './agile-routing.module';
import { AgileComponent } from './agile.component';
import { NbAccordionModule, NbAlertModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { UiFeaturesRoutingModule } from '../../ui-features/ui-features-routing.module';
import { CountryOrdersMapComponent } from '../../e-commerce/country-orders/map/country-orders-map.component';
import { CountryOrdersComponent } from '../../e-commerce/country-orders/country-orders.component';
import { ProgressBarComponent } from '../../extra-components/progress-bar/progress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesComponent } from './features/features.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { InputTextModule } from 'primeng/inputtext';

import { DemonstrationComponent } from './demonstration/demonstration.component';

import { WorkSpaceComponent } from './work-space/work-space.component';
import { AddWorkSpaceComponent } from './work-space/add-work-space/add-work-space.component';
import { AppComponent } from '../../../app.component';
import { ProjectComponent } from './project/project.component';

import { truncate } from 'fs';
import { ExecuterComponent } from './executer/executer.component';
import { LoginComponent } from './login/login.component';
import { ProjectManagerComponent } from './project-manager/project-manager.component';



@NgModule({
  declarations: [
    AgileComponent,
    FeaturesComponent,
    DemonstrationComponent,
    WorkSpaceComponent,
    ProjectComponent,

    ExecuterComponent,
    LoginComponent,
    ProjectManagerComponent,

    
  ],
  imports: [
    InputTextModule,
    KnobModule,
    DialogModule,
    ButtonModule,
    PickListModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AgileRoutingModule,
    NbCardModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,    
    NbTabsetModule,
    NbAccordionModule,
    NbTreeGridModule,
    NbStepperModule,
    NbSelectModule,
  ]
})
export class AgileModule { }
