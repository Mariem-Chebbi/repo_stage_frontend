import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartStatusComponent } from './piechart-status.component';

describe('PiechartStatusComponent', () => {
  let component: PiechartStatusComponent;
  let fixture: ComponentFixture<PiechartStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiechartStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
