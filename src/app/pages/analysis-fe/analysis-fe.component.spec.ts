import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFeComponent } from './analysis-fe.component';

describe('AnalysisFeComponent', () => {
  let component: AnalysisFeComponent;
  let fixture: ComponentFixture<AnalysisFeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisFeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
