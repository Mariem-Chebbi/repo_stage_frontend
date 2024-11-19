import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SafeMethodologiePresentationComponent } from "./safe-methodologie-presentation/safe-methodologie-presentation.component";
import { UpdateDemoComponent } from "./update-demo/update-demo.component";
import { SafeProcessComponent } from "./safe-process/safe-process.component";
import { SprintDetailsComponent } from "./sprint-details/sprint-details.component";

const routes: Routes = [
  // { path: "agile/safe", component: DemoSAFeComponent },
/*   { path: "agile", component: SafeMethodologiePresentationComponent },
  { path: "update", component: UpdateDemoComponent },
  { path: "safe-process", component: SafeProcessComponent },
  { path:"sprint-details",component: SprintDetailsComponent} */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SAFeMethodologieRoutingModule {}
