import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKpiComponent } from './view-kpi.component';

describe('ViewKpiComponent', () => {
  let component: ViewKpiComponent;
  let fixture: ComponentFixture<ViewKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewKpiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
