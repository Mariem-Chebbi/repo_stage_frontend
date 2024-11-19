import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateASDStepComponent } from './create-asdstep.component';

describe('CreateASDStepComponent', () => {
  let component: CreateASDStepComponent;
  let fixture: ComponentFixture<CreateASDStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateASDStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateASDStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
