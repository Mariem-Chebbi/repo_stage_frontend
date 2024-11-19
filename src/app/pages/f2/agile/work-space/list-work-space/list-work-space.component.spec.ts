import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkSpaceComponent } from './list-work-space.component';

describe('ListWorkSpaceComponent', () => {
  let component: ListWorkSpaceComponent;
  let fixture: ComponentFixture<ListWorkSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWorkSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
