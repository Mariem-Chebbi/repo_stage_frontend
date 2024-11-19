import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFeaturesComponent } from './show-features.component';

describe('ShowFeaturesComponent', () => {
  let component: ShowFeaturesComponent;
  let fixture: ComponentFixture<ShowFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
