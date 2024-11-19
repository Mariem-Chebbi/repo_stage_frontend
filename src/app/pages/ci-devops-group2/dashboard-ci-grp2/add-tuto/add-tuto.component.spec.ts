import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTutoComponent } from './add-tuto.component';

describe('AddTutoComponent', () => {
  let component: AddTutoComponent;
  let fixture: ComponentFixture<AddTutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
