import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormObjectifsComponent } from './edit-form-objectifs.component';

describe('EditFormObjectifsComponent', () => {
  let component: EditFormObjectifsComponent;
  let fixture: ComponentFixture<EditFormObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormObjectifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
