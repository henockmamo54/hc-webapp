import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlipidemiaPredictionComponent } from './hyperlipidemia-prediction.component';

describe('HyperlipidemiaPredictionComponent', () => {
  let component: HyperlipidemiaPredictionComponent;
  let fixture: ComponentFixture<HyperlipidemiaPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlipidemiaPredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlipidemiaPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
