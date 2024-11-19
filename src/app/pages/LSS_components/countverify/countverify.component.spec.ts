import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountverifyComponent } from './countverify.component';

describe('CountverifyComponent', () => {
  let component: CountverifyComponent;
  let fixture: ComponentFixture<CountverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountverifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
