import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanprogressComponent } from './kanbanprogress.component';

describe('KanbanprogressComponent', () => {
  let component: KanbanprogressComponent;
  let fixture: ComponentFixture<KanbanprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
