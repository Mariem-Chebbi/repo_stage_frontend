import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule, NbTabsetModule, NbWindowModule } from '@nebular/theme';
import { SAFeMethodologieRoutingModule } from './safe-methodologie-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbIconModule ,NbStepperModule,NbAccordionModule } from '@nebular/theme';
import { SafeMethodologiePresentationComponent } from './safe-methodologie-presentation/safe-methodologie-presentation.component';
import { UpdateDemoComponent } from './update-demo/update-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SprintDetailsComponent } from './sprint-details/sprint-details.component';
import { TaskChartsComponent } from './charts/task-charts/task-charts.component';
import { SprintChartsComponent } from './charts/sprint-charts/sprint-charts.component';
import { SafeProcessComponent } from './safe-process/safe-process.component';

@NgModule({
  declarations: [
    // SafeMethodologiePresentationComponent,
    // UpdateDemoComponent,
    // SafeProcessComponent,
 /*    SprintDetailsComponent,
    TaskChartsComponent,
    SprintChartsComponent, */
 
  ],
  imports: [
    NbButtonModule,
    NbCardModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbAccordionModule ,
    NbIconModule,
    NbStepperModule,
    NbTabsetModule ,
    NbWindowModule,
    SAFeMethodologieRoutingModule,
    NbInputModule ,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    CommonModule,  // Ensure CommonModule is imported

  ]
})
export class SAFeMethodologieModule { }
