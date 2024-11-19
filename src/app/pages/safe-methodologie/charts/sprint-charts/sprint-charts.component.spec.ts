import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintChartsComponent } from './sprint-charts.component';

describe('SprintChartsComponent', () => {
  let component: SprintChartsComponent;
  let fixture: ComponentFixture<SprintChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
