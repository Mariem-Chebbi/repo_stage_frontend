import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtqPercentageChartComponent } from './ctq-percentage-chart.component';

describe('CtqPercentageChartComponent', () => {
  let component: CtqPercentageChartComponent;
  let fixture: ComponentFixture<CtqPercentageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtqPercentageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtqPercentageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
