import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWorkSpaceComponent } from './details-work-space.component';

describe('DetailsWorkSpaceComponent', () => {
  let component: DetailsWorkSpaceComponent;
  let fixture: ComponentFixture<DetailsWorkSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsWorkSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
