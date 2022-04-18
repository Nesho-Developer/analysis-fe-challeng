import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AnalysisFeComponent} from "./pages/analysis-fe/analysis-fe.component";
import {AnalysisFeDetailsComponent} from "./pages/analysis-fe-details/analysis-fe-details.component";

const routes: Routes = [
  {path:'', loadChildren: () => import('./pages/analysis-fe/analysis-fe.module').then(m => m.AnalysisFeModule)},
  {path:'details', loadChildren: () => import('./pages/analysis-fe-details/analysis-fe-details.module').then(m => m.AnalysisFeDetailsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
