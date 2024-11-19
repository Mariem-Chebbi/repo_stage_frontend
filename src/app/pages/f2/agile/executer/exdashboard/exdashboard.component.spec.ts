import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExdashboardComponent } from './exdashboard.component';

describe('ExdashboardComponent', () => {
  let component: ExdashboardComponent;
  let fixture: ComponentFixture<ExdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
