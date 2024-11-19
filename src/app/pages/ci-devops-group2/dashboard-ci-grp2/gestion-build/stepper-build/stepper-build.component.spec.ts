import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperBuildComponent } from './stepper-build.component';

describe('StepperBuildComponent', () => {
  let component: StepperBuildComponent;
  let fixture: ComponentFixture<StepperBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperBuildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
