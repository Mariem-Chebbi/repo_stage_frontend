import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChartsComponent } from './task-charts.component';

describe('TaskChartsComponent', () => {
  let component: TaskChartsComponent;
  let fixture: ComponentFixture<TaskChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
