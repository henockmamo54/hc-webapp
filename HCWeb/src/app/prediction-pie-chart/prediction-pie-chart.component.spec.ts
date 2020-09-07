import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionPieChartComponent } from './prediction-pie-chart.component';

describe('PredictionPieChartComponent', () => {
  let component: PredictionPieChartComponent;
  let fixture: ComponentFixture<PredictionPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictionPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
