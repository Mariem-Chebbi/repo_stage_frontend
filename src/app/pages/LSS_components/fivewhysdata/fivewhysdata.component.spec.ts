import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivewhysdataComponent } from './fivewhysdata.component';

describe('FivewhysdataComponent', () => {
  let component: FivewhysdataComponent;
  let fixture: ComponentFixture<FivewhysdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivewhysdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FivewhysdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
