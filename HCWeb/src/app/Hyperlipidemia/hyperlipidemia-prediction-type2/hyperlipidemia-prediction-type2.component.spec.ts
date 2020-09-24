import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlipidemiaPredictionType2Component } from './hyperlipidemia-prediction-type2.component';

describe('HyperlipidemiaPredictionType2Component', () => {
  let component: HyperlipidemiaPredictionType2Component;
  let fixture: ComponentFixture<HyperlipidemiaPredictionType2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlipidemiaPredictionType2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlipidemiaPredictionType2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
