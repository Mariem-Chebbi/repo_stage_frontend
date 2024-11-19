import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementPageComponent } from './assignement-page.component';

describe('AssignementPageComponent', () => {
  let component: AssignementPageComponent;
  let fixture: ComponentFixture<AssignementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
