import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFeDetailsComponent } from './analysis-fe-details.component';

describe('AnalysisFeDetailsComponent', () => {
  let component: AnalysisFeDetailsComponent;
  let fixture: ComponentFixture<AnalysisFeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisFeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
