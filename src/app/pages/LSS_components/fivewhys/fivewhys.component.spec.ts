import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivewhysComponent } from './fivewhys.component';

describe('FivewhysComponent', () => {
  let component: FivewhysComponent;
  let fixture: ComponentFixture<FivewhysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivewhysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FivewhysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
