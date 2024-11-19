import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountsipocComponent } from './countsipoc.component';

describe('CountsipocComponent', () => {
  let component: CountsipocComponent;
  let fixture: ComponentFixture<CountsipocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountsipocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountsipocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
