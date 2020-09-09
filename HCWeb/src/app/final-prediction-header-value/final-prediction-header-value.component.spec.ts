import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPredictionHeaderValueComponent } from './final-prediction-header-value.component';

describe('FinalPredictionHeaderValueComponent', () => {
  let component: FinalPredictionHeaderValueComponent;
  let fixture: ComponentFixture<FinalPredictionHeaderValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalPredictionHeaderValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalPredictionHeaderValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
