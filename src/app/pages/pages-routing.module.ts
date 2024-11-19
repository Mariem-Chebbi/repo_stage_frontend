import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListArchiveComponent } from './dad_components/archives/list-archive/list-archive.component';
import { DashboardComponent } from './dad_components/dashboard/dashboard.component';
import { DadStepsComponent } from './dad_components/dad-steps/dad-steps.component';
import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ScrumPokerG2DemoComponent } from './scrum-poker-group2/scrum-poker-g2-demo/scrum-poker-g2-demo.component';
import { DemoFormComponent } from './scrum-poker-group2/scrum-poker-g2-demo/demo-form/demo-form.component';
import { SessionComponent } from './scrum-poker-group2/scrum-poker-g2-demo/session/session.component';
import { RoomComponent } from './scrum-poker-group2/scrum-poker-g2-demo/room/room.component';
import { ResultComponent } from './scrum-poker-group2/scrum-poker-g2-demo/room/result/result.component';
import { SafeProcessComponent } from './safe-methodologie/safe-process/safe-process.component';
import { SafeMethodologiePresentationComponent } from './safe-methodologie/safe-methodologie-presentation/safe-methodologie-presentation.component';
import { UpdateDemoComponent } from './safe-methodologie/update-demo/update-demo.component';
import { SprintDetailsComponent } from './safe-methodologie/sprint-details/sprint-details.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '', loadChildren: () => import('./dad_components/guide/guide.module')
        .then(m => m.GuideModule),
    },
    {
      path: '', loadChildren: () => import('./dad_components/project/project.module')
        .then(m => m.ProjectModule),
    },
    {
      path: '', loadChildren: () => import('./dad_components/features/features.module')
        .then(m => m.FeaturesModule),
    },
    {
      path: '', loadChildren: () => import('./dad_components/release/release.module')
        .then(m => m.ReleaseModule),
    },

    {
      path: 'agile/dad/steps/:id',
      component: DadStepsComponent,
    },
    {
      path: 'agile/dad/dashboard/:id',
      component: DashboardComponent,
    },
    {
      path: 'agile/dad/archives/:id',
      component: ListArchiveComponent,
    },
    {
      path: 'agile/scrum-poker-group2',
      component: ScrumPokerG2DemoComponent,
    },
    { path: "agile/safe-agile", component: SafeMethodologiePresentationComponent },
    { path: "safe-update", component: UpdateDemoComponent },
    { path: "safe-process", component: SafeProcessComponent },
    { path: "sprint-details", component: SprintDetailsComponent },

    {
      path: 'agile/scrum-poker-group2/demoform',
      component: DemoFormComponent,
    },
    {
      path: 'agile/scrum-poker-group2/session/room/:id',
      component: RoomComponent,
    },
    {
      path: 'agile/scrum-poker-group2/session/room',
      component: RoomComponent,
    },
    {
      path: 'agile/scrum-poker-group2/session',
      component: SessionComponent,
    },
    {
      path: 'agile/scrum-poker-group2/session/room/:id/result',
      component: ResultComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'agile',
      loadChildren: () => import('./f2/agile/agile.module')
        .then(m => m.AgileModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
