import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule, routedComponents } from './project-routing.module';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbStepperModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
    imports: [
        CommonModule,
        ProjectRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NbStepperModule,
        NbCardModule,
        NbInputModule,
        NbButtonModule,
        NbDatepickerModule,
        NbBadgeModule,
        NbIconModule,
        NbEvaIconsModule,

    ],
    declarations: [
        ...routedComponents,
        ListProjectComponent
    ],
})
export class ProjectModule { }
