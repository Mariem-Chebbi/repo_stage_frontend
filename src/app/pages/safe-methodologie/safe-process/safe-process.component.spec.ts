import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeProcessComponent } from './safe-process.component';

describe('SafeProcessComponent', () => {
  let component: SafeProcessComponent;
  let fixture: ComponentFixture<SafeProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
