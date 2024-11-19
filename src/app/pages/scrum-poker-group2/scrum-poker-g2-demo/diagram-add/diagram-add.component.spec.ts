import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramAddComponent } from './diagram-add.component';

describe('DiagramAddComponent', () => {
  let component: DiagramAddComponent;
  let fixture: ComponentFixture<DiagramAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
