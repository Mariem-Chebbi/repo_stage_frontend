import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconLibraries, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbRouteTabsetModule, NbStepperModule, NbTabsetModule, NbThemeModule } from '@nebular/theme';

import { ScrollTopModule } from 'primeng/scrolltop';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { OverlayModule } from 'primeng/overlay';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { GuideRoutingModule, routedComponents } from './guide-routing.module';
import { EditorModule } from 'primeng/editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
    imports: [
        CommonModule,
        NbCardModule,
        ThemeModule,
        ScrollTopModule,
        ButtonModule,
        NbAccordionModule,
        NbTabsetModule,
        NbRouteTabsetModule,
        NbStepperModule,
        NbButtonModule,
        NbListModule,
        NbAccordionModule,
        AccordionModule,
        TimelineModule,
        CardModule,
        OverlayModule,
        ScrollPanelModule,
        GuideRoutingModule,
        NbInputModule,
        EditorModule,
        FormsModule,
        ReactiveFormsModule,
        NbLayoutModule,
        NbIconModule,
        NbEvaIconsModule,
        NbDialogModule.forRoot(),
        NbThemeModule.forRoot(),
        CKEditorModule

    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        NbIconLibraries,
    ],
})
export class GuideModule { }
