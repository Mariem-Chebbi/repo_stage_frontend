import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule, NbStepperModule, NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../../@theme/theme.module';
// import { TrafficChartComponent } from './traffic/traffic-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScrumPokerG2DemoComponent} from './scrum-poker-g2-demo.component';
// import {StepperComponent} from './stepper/stepper.component';
import {RouterLink} from '@angular/router';
import { DemoUpdateComponent } from './demo-update/demo-update.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {LimitsUpdateComponent} from './limits-update/limits-update.component';
import {BenefitsAddComponent} from './benefits-add/benefits-add.component';
import {BenifitsUpdateComponent} from './benifits-update/benifits-update.component';
import {StepsUpdateComponent} from './steps/steps-update/steps-update.component';
import {StepCreateComponent} from './steps/step-create/step-create.component';
import {NewsUpdateComponent} from './news-update/news-update.component';
import {LimitssAddComponent} from './limitss-add/limitss-add.component';
import {SecurityCamerasComponent} from './security-cameras/security-cameras.component';
import {IntroUpdateComponent} from './intro-update/intro-update.component';
import {DiagramAddComponent} from './diagram-add/diagram-add.component';
import {DiagramUpdateComponent} from './diagram-update/diagram-update.component';
import { SessionComponent } from './session/session.component';
import { RoomComponent } from './room/room.component';
import { InvitePlayersComponent } from './room/invite-players/invite-players.component';
import { ResultComponent } from './room/result/result.component';
import {ChartModule} from 'angular2-chartjs';
import {EchartsBarComponent} from './room/result/echarts-bar.component';
import {EchartsPieComponent} from './room/result/echarts-pie.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { IssuesUpdateComponent } from './room/issues-update/issues-update.component';
import { SessionUpdateComponent } from './room/session-update/session-update.component';
import { VotingHistoryComponent } from './room/voting-history/voting-history.component';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {BarChartModule} from '@swimlane/ngx-charts';




@NgModule({
    imports: [
        FormsModule,
        ThemeModule,
        NbCardModule,
        NbUserModule,
        NbButtonModule,
        NbTabsetModule,
        NbActionsModule,
        NbRadioModule,
        NbSelectModule,
        NbListModule,
        NbIconModule,
        NbButtonModule,
        NgxEchartsModule,
        NbStepperModule,
        ReactiveFormsModule,
        RouterLink,
        NbInputModule,
        ChartModule,
        Ng2SmartTableModule,
        BarChartModule,
    ],
  declarations: [
    ScrumPokerG2DemoComponent,
    DemoFormComponent,
    DemoUpdateComponent,
    LimitsUpdateComponent,
    BenefitsAddComponent,
    BenifitsUpdateComponent,
    StepsUpdateComponent,
    StepCreateComponent,
    NewsUpdateComponent,
    LimitssAddComponent,
    SecurityCamerasComponent,
    IntroUpdateComponent,
    DiagramAddComponent,
    DiagramUpdateComponent,
    SessionComponent,
    RoomComponent,
    InvitePlayersComponent,
    ResultComponent,
    EchartsBarComponent,
    EchartsPieComponent,
    IssuesUpdateComponent,
    SessionUpdateComponent,
    VotingHistoryComponent,
  ],
  exports: [
  ],
})
export class ScrumPokerG2DemodModule { }
