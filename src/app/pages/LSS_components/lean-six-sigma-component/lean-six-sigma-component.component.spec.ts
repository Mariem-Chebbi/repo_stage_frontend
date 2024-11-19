import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeanSixSigmaComponentComponent } from './lean-six-sigma-component.component';

describe('LeanSixSigmaComponentComponent', () => {
  let component: LeanSixSigmaComponentComponent;
  let fixture: ComponentFixture<LeanSixSigmaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeanSixSigmaComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeanSixSigmaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
