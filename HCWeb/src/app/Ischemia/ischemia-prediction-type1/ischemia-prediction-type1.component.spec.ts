import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IschemiaPredictionType1Component } from './ischemia-prediction-type1.component';

describe('IschemiaPredictionType1Component', () => {
  let component: IschemiaPredictionType1Component;
  let fixture: ComponentFixture<IschemiaPredictionType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IschemiaPredictionType1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IschemiaPredictionType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
