import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsUpdateComponent } from './steps-update.component';

describe('StepsUpdateComponent', () => {
  let component: StepsUpdateComponent;
  let fixture: ComponentFixture<StepsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsUpdateComponent ]})
    .compileComponents();

    fixture = TestBed.createComponent(StepsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
