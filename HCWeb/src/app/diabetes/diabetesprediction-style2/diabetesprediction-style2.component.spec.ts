import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetespredictionStyle2Component } from './diabetesprediction-style2.component';

describe('DiabetespredictionStyle2Component', () => {
  let component: DiabetespredictionStyle2Component;
  let fixture: ComponentFixture<DiabetespredictionStyle2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabetespredictionStyle2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetespredictionStyle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
