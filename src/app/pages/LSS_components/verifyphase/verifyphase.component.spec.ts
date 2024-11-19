import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyphaseComponent } from './verifyphase.component';

describe('VerifyphaseComponent', () => {
  let component: VerifyphaseComponent;
  let fixture: ComponentFixture<VerifyphaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyphaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
