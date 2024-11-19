import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIterationComponent } from './add-iteration.component';

describe('AddIterationComponent', () => {
  let component: AddIterationComponent;
  let fixture: ComponentFixture<AddIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
