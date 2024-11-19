import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToImplementComponent } from './how-to-implement.component';

describe('HowToImplementComponent', () => {
  let component: HowToImplementComponent;
  let fixture: ComponentFixture<HowToImplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToImplementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowToImplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
