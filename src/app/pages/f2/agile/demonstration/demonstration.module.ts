import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonstrationRoutingModule } from './demonstration-routing.module';
import { AddDemoComponent } from './add-demo/add-demo.component';
import { ShowDemoComponent } from './show-demo/show-demo.component';
import { EditDemoComponent } from './edit-demo/edit-demo.component';
import { DemoListComponent, TruncatePipe } from './demo-list/demo-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbAlertModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ThemeModule } from '../../../../@theme/theme.module';


@NgModule({
  declarations: [
    AddDemoComponent,
    ShowDemoComponent,
    EditDemoComponent,
    DemoListComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DemonstrationRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    CKEditorModule,
    NbStepperModule,
    NbPopoverModule,
    NbSearchModule,
    NbIconModule,
    NbAlertModule,
    ThemeModule,    
    NbTabsetModule,
    NbAccordionModule,
    NbTreeGridModule,
    NbSelectModule,
  ]
})
export class DemonstrationModule { }
