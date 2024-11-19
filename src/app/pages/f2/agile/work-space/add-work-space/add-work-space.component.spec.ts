import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkSpaceComponent } from './add-work-space.component';

describe('AddWorkSpaceComponent', () => {
  let component: AddWorkSpaceComponent;
  let fixture: ComponentFixture<AddWorkSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
