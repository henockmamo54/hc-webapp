import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlipidemiaPredictionType1Component } from './hyperlipidemia-prediction-type1.component';

describe('HyperlipidemiaPredictionType1Component', () => {
  let component: HyperlipidemiaPredictionType1Component;
  let fixture: ComponentFixture<HyperlipidemiaPredictionType1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlipidemiaPredictionType1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlipidemiaPredictionType1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
