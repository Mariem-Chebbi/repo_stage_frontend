import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectrateComponent } from './defectrate.component';

describe('DefectrateComponent', () => {
  let component: DefectrateComponent;
  let fixture: ComponentFixture<DefectrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
