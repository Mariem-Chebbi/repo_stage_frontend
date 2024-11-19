import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActioncountComponent } from './actioncount.component';

describe('ActioncountComponent', () => {
  let component: ActioncountComponent;
  let fixture: ComponentFixture<ActioncountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActioncountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActioncountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
