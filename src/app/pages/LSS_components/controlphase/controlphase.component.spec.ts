import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlphaseComponent } from './controlphase.component';

describe('ControlphaseComponent', () => {
  let component: ControlphaseComponent;
  let fixture: ComponentFixture<ControlphaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlphaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
