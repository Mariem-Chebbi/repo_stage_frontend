import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgileComponent } from './agile.component';

describe('AgileComponent', () => {
  let component: AgileComponent;
  let fixture: ComponentFixture<AgileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
