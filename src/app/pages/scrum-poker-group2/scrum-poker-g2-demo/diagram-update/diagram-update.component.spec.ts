import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramUpdateComponent } from './diagram-update.component';

describe('DiagramUpdateComponent', () => {
  let component: DiagramUpdateComponent;
  let fixture: ComponentFixture<DiagramUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramUpdateComponent ]})
    .compileComponents();

    fixture = TestBed.createComponent(DiagramUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
