import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeMethodologiePresentationComponent } from './safe-methodologie-presentation.component';

describe('SafeMethodologiePresentationComponent', () => {
  let component: SafeMethodologiePresentationComponent;
  let fixture: ComponentFixture<SafeMethodologiePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeMethodologiePresentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafeMethodologiePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
