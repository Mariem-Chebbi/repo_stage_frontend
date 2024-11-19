import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIterationComponent } from './edit-iteration.component';

describe('EditIterationComponent', () => {
  let component: EditIterationComponent;
  let fixture: ComponentFixture<EditIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
