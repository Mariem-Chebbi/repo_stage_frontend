import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkSpaceComponent } from './edit-work-space.component';

describe('EditWorkSpaceComponent', () => {
  let component: EditWorkSpaceComponent;
  let fixture: ComponentFixture<EditWorkSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
