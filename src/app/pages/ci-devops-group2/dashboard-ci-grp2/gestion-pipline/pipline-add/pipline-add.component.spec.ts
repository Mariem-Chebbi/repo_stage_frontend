import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiplineAddComponent } from './pipline-add.component';

describe('PiplineAddComponent', () => {
  let component: PiplineAddComponent;
  let fixture: ComponentFixture<PiplineAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiplineAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiplineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
