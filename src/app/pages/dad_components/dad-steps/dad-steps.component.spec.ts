import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadStepsComponent } from './dad-steps.component';

describe('DadStepsComponent', () => {
  let component: DadStepsComponent;
  let fixture: ComponentFixture<DadStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
