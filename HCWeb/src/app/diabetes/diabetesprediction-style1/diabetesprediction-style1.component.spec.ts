import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetespredictionStyle1Component } from './diabetesprediction-style1.component';

describe('DiabetespredictionStyle1Component', () => {
  let component: DiabetespredictionStyle1Component;
  let fixture: ComponentFixture<DiabetespredictionStyle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabetespredictionStyle1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetespredictionStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
