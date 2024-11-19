import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIterationComponent } from './list-iteration.component';

describe('ListIterationComponent', () => {
  let component: ListIterationComponent;
  let fixture: ComponentFixture<ListIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
