import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnalysisFeDetailsComponent} from "./analysis-fe-details.component";

const routes: Routes = [
  {path:'', component: AnalysisFeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisFeDetailsRoutingModule { }
