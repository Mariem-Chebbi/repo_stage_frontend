import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsUpdateComponent } from './limits-update.component';

describe('LimitsUpdateComponent', () => {
  let component: LimitsUpdateComponent;
  let fixture: ComponentFixture<LimitsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitsUpdateComponent ]})
      .compileComponents();

    fixture = TestBed.createComponent(LimitsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
