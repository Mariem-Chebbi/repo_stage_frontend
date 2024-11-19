import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsAddComponent } from './benefits-add.component';

describe('BenefitsAddComponent', () => {
  let component: BenefitsAddComponent;
  let fixture: ComponentFixture<BenefitsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsAddComponent ]})
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
