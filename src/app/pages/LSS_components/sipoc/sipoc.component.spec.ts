import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SipocComponent } from './sipoc.component';

describe('SipocComponent', () => {
  let component: SipocComponent;
  let fixture: ComponentFixture<SipocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SipocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SipocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
