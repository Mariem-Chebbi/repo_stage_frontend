import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbSelectModule, NbStepperModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ShowFeaturesComponent } from './show-features/show-features.component';
import { FeaturesRoutingModule, routedComponents } from './features-routing.module';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DetailsFeatureComponent } from './details-feature/details-feature.component';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        FeaturesRoutingModule,
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
        DataViewModule,
        TagModule,
        NbSelectModule

    ],
    declarations: [
        ...routedComponents,
        ShowFeaturesComponent,
        DetailsFeatureComponent
    ],
    exports: [
        DetailsFeatureComponent,
        ShowFeaturesComponent
    ]
})
export class FeaturesModule { }
