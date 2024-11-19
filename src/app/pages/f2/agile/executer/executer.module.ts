import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecuterRoutingModule } from './executer-routing.module';
import { ExdashboardComponent } from './exdashboard/exdashboard.component';
import { AffectedTasksComponent } from './affected-tasks/affected-tasks.component';
import { AssignementPageComponent } from './assignement-page/assignement-page.component';
import { NbAlertModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesRoutingModule } from '../../../tables/tables-routing.module';
import { SafeUrlPipe } from './safe-url.pipe';


@NgModule({
  declarations: [
    ExdashboardComponent,
    AffectedTasksComponent,
    AssignementPageComponent,
    SafeUrlPipe,
    
    
  ],
  imports: [
    CommonModule,
    NbAlertModule,
    ExecuterRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class ExecuterModule { }
