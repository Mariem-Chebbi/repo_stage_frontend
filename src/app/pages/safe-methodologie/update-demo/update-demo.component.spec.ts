import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemoComponent } from './update-demo.component';

describe('UpdateDemoComponent', () => {
  let component: UpdateDemoComponent;
  let fixture: ComponentFixture<UpdateDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
