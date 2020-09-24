import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IschemiaPredictionComponent } from './ischemia-prediction.component';

describe('IschemiaPredictionComponent', () => {
  let component: IschemiaPredictionComponent;
  let fixture: ComponentFixture<IschemiaPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IschemiaPredictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IschemiaPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
