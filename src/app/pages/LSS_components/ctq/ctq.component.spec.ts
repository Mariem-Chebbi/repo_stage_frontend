import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtqComponent } from './ctq.component';

describe('CtqComponent', () => {
  let component: CtqComponent;
  let fixture: ComponentFixture<CtqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
