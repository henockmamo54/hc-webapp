import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IschemiaPredictionType2Component } from './ischemia-prediction-type2.component';

describe('IschemiaPredictionType2Component', () => {
  let component: IschemiaPredictionType2Component;
  let fixture: ComponentFixture<IschemiaPredictionType2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IschemiaPredictionType2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IschemiaPredictionType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
