import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjectifsComponent } from './form-objectifs.component';

describe('FormObjectifsComponent', () => {
  let component: FormObjectifsComponent;
  let fixture: ComponentFixture<FormObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormObjectifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
