import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartVerifyComponent } from './radar-chart-verify.component';

describe('RadarChartVerifyComponent', () => {
  let component: RadarChartVerifyComponent;
  let fixture: ComponentFixture<RadarChartVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarChartVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarChartVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
