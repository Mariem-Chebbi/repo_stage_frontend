import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReleaseComponent } from './details-release.component';

describe('DetailsReleaseComponent', () => {
  let component: DetailsReleaseComponent;
  let fixture: ComponentFixture<DetailsReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
