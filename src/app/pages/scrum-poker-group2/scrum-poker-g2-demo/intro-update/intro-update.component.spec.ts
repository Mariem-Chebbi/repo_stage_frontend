import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroUpdateComponent } from './intro-update.component';

describe('IntroUpdateComponent', () => {
  let component: IntroUpdateComponent;
  let fixture: ComponentFixture<IntroUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
