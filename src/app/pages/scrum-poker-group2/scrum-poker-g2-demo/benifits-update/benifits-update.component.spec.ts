import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenifitsUpdateComponent } from './benifits-update.component';

describe('BenifitsUpdateComponent', () => {
  let component: BenifitsUpdateComponent;
  let fixture: ComponentFixture<BenifitsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenifitsUpdateComponent ]})
      .compileComponents();

    fixture = TestBed.createComponent(BenifitsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
