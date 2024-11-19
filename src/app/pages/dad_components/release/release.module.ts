import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule, NbStepperModule, NbToastrModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { ListReleaseComponent } from './list-release/list-release.component';
import { ReleaseRoutingModule, routedComponents } from './release-routing.module';
import { AddReleaseComponent } from './add-release/add-release.component';
import { AssignReleaseComponent } from './assign-release/assign-release.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DatepickerEditorComponent } from './datepicker-editor/datepicker-editor.component';
import { DetailsButtonComponent } from './details-button/details-button.component';
import { DetailsReleaseComponent } from './details-release/details-release.component';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { FeaturesModule } from '../features/features.module';
import { config } from 'rxjs';
import { EditReleaseComponent } from './edit-release/edit-release.component';



@NgModule({
    imports: [
        CommonModule,
        ReleaseRoutingModule,
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
        PickListModule,
        OrderListModule,
        NbBadgeModule,
        Ng2SmartTableModule,
        DataViewModule,
        TagModule,
        NbSelectModule,
        FeaturesModule,
        NbToastrModule.forRoot(),







    ],
    declarations: [
        ...routedComponents,
        ListReleaseComponent,
        AddReleaseComponent,
        AssignReleaseComponent,
        DatepickerEditorComponent,
        DetailsButtonComponent,
        DetailsReleaseComponent,
        EditReleaseComponent,

    ],
    exports: [
        ListReleaseComponent,
        DetailsReleaseComponent
    ]
})
export class ReleaseModule { }
