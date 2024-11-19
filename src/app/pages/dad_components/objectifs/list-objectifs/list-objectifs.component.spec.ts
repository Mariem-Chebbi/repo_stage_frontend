import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjectifsComponent } from './list-objectifs.component';

describe('ListObjectifsComponent', () => {
  let component: ListObjectifsComponent;
  let fixture: ComponentFixture<ListObjectifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListObjectifsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListObjectifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
