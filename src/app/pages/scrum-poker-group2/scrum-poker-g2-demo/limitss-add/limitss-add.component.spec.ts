import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitssAddComponent } from './limitss-add.component';

describe('LimitssAddComponent', () => {
  let component: LimitssAddComponent;
  let fixture: ComponentFixture<LimitssAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitssAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitssAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
