import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisFeDetailsRoutingModule } from './analysis-fe-details-routing.module';
import { AnalysisFeDetailsComponent } from './analysis-fe-details.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    AnalysisFeDetailsComponent
  ],
  imports: [
    CommonModule,
    AnalysisFeDetailsRoutingModule,
    TranslateModule.forChild()
  ]
})
export class AnalysisFeDetailsModule { }
