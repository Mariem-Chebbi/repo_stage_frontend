import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTriggerComponent } from './build-trigger.component';

describe('BuildTriggerComponent', () => {
  let component: BuildTriggerComponent;
  let fixture: ComponentFixture<BuildTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildTriggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
