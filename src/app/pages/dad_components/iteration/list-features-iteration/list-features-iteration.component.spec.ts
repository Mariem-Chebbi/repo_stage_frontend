import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeaturesIterationComponent } from './list-features-iteration.component';

describe('ListFeaturesIterationComponent', () => {
  let component: ListFeaturesIterationComponent;
  let fixture: ComponentFixture<ListFeaturesIterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFeaturesIterationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFeaturesIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
