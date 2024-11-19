import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SipocComponent } from './sipoc/sipoc.component';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldComponent, NbIconModule, NbLayoutModule, NbListModule, NbPopoverModule, NbProgressBarModule, NbRadioModule, NbSelectModule, NbStepperComponent, NbStepperModule, NbTabsetModule, NbThemeModule, NbTooltipModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { LayoutModule } from '../layout/layout.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParetoChartComponent } from './pareto-chart/pareto-chart.component';
import { ChartModule } from 'angular2-chartjs';
import { FivewhysComponent } from './fivewhys/fivewhys.component';
import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { ControlphaseComponent } from './controlphase/controlphase.component';
import { CtqComponent } from './ctq/ctq.component';
import { VerifyphaseComponent } from './verifyphase/verifyphase.component';
import { MeasurephaseComponent } from './measurephase/measurephase.component';
import { ActionItemComponent } from './action-item/action-item.component';
import { PrototypingComponent } from './prototyping/prototyping.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CheckboxComponent } from './verifyphase/checkbox/checkbox.component';
import { RadarChartVerifyComponent } from './radar-chart-verify/radar-chart-verify.component';
import { PiechartStatusComponent } from './piechart-status/piechart-status.component';
import { DefectrateComponent } from './defectrate/defectrate.component';
import { ActioncountComponent } from './actioncount/actioncount.component';
import { CtqPercentageChartComponent } from './ctq-percentage-chart/ctq-percentage-chart.component';
import { ChartjsMultipleXaxisComponent } from '../charts/chartjs/chartjs-multiple-xaxis.component';
import { KanbanprogressComponent } from './kanbanprogress/kanbanprogress.component';
import { CardpercentagebymonthComponent } from './cardpercentagebymonth/cardpercentagebymonth.component';
import { FivewhysdataComponent } from './fivewhysdata/fivewhysdata.component';
import { CountsipocComponent } from './countsipoc/countsipoc.component';
import { CountverifyComponent } from './countverify/countverify.component';



@NgModule({
  declarations: [
    SipocComponent,
    ParetoChartComponent,
    FivewhysComponent,
    KanbanboardComponent ,
    ControlphaseComponent ,
    CtqComponent,
    VerifyphaseComponent,
    MeasurephaseComponent,
    ActionItemComponent,
    PrototypingComponent,
    CheckboxComponent,
    RadarChartVerifyComponent,
    PiechartStatusComponent,
    DefectrateComponent,
    ActioncountComponent,
    CtqPercentageChartComponent,
    KanbanprogressComponent,
    CardpercentagebymonthComponent,
    FivewhysdataComponent,
    CountsipocComponent,
    CountverifyComponent
    
      ],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    ThemeModule,
    NbTabsetModule,
    NbAccordionModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    ChartModule ,
    NbStepperModule,
    NbLayoutModule,
    LayoutModule,
    NbRadioModule,
    NbProgressBarModule,
    NbPopoverModule,
    NbListModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NgxChartsModule,
    NbActionsModule,
    NbTooltipModule
    
    
  ],
  exports: [
    SipocComponent,
    ParetoChartComponent,
    FivewhysComponent,
    KanbanboardComponent,
    ControlphaseComponent,
    CtqComponent,
    VerifyphaseComponent,
    MeasurephaseComponent,
    ActionItemComponent,
    PrototypingComponent,
    CheckboxComponent,
    RadarChartVerifyComponent,
    PiechartStatusComponent,
    DefectrateComponent,
    ActioncountComponent,
    CtqPercentageChartComponent,
    KanbanprogressComponent,
    CardpercentagebymonthComponent,
    FivewhysdataComponent,
    CountsipocComponent,
    CountverifyComponent
    

  ]
})
export class LeanSixSigmaModule { }