import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlipidemiaStatusPiechartComponent } from './hyperlipidemia-status-piechart.component';

describe('HyperlipidemiaStatusPiechartComponent', () => {
  let component: HyperlipidemiaStatusPiechartComponent;
  let fixture: ComponentFixture<HyperlipidemiaStatusPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlipidemiaStatusPiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlipidemiaStatusPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
