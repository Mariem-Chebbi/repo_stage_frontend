import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdImpComponent } from './asd-imp.component';

describe('AsdImpComponent', () => {
  let component: AsdImpComponent;
  let fixture: ComponentFixture<AsdImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsdImpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsdImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
