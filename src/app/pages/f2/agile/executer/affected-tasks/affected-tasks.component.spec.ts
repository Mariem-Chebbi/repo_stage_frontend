import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectedTasksComponent } from './affected-tasks.component';

describe('AffectedTasksComponent', () => {
  let component: AffectedTasksComponent;
  let fixture: ComponentFixture<AffectedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectedTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
