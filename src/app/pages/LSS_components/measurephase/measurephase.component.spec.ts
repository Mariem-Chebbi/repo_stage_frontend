import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurephaseComponent } from './measurephase.component';

describe('MeasurephaseComponent', () => {
  let component: MeasurephaseComponent;
  let fixture: ComponentFixture<MeasurephaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurephaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasurephaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
