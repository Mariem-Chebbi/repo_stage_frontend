import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhaustiveTutorialComponent } from './exhaustive-tutorial.component';

describe('ExhaustiveTutorialComponent', () => {
  let component: ExhaustiveTutorialComponent;
  let fixture: ComponentFixture<ExhaustiveTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhaustiveTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhaustiveTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
