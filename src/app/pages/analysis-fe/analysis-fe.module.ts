import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisFeRoutingModule } from './analysis-fe-routing.module';
import { AnalysisFeComponent } from './analysis-fe.component';
import {TranslateModule} from "@ngx-translate/core";
import {NgChartsModule} from "ng2-charts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AnalysisFeComponent
  ],
  imports: [
    CommonModule,
    AnalysisFeRoutingModule,
    TranslateModule.forChild(), NgChartsModule, FormsModule, ReactiveFormsModule,
  ]
})
export class AnalysisFeModule { }
