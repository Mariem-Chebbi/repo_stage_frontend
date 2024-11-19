import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardpercentagebymonthComponent } from './cardpercentagebymonth.component';

describe('CardpercentagebymonthComponent', () => {
  let component: CardpercentagebymonthComponent;
  let fixture: ComponentFixture<CardpercentagebymonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardpercentagebymonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardpercentagebymonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
