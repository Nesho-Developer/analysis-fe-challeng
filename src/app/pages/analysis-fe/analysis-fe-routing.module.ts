import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnalysisFeComponent} from "./analysis-fe.component";

const routes: Routes = [
  {path: '', component: AnalysisFeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisFeRoutingModule { }
