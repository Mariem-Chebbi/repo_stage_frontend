import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypingComponent } from './prototyping.component';

describe('PrototypingComponent', () => {
  let component: PrototypingComponent;
  let fixture: ComponentFixture<PrototypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrototypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
