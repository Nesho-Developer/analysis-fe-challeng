import { Component, OnInit } from '@angular/core';
import {Lesson} from "../../core/models/Lesson";

@Component({
  selector: 'app-analysis-fe-details',
  templateUrl: './analysis-fe-details.component.html',
  styleUrls: ['./analysis-fe-details.component.scss']
})
export class AnalysisFeDetailsComponent implements OnInit {
  lessons: Lesson[] = [];
  constructor() {
    this.lessons = window.history.state.lessons?? [];
  }

  ngOnInit(): void {
  }

}
