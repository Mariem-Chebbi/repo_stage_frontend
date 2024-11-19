import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMamagementComponent } from './project-mamagement.component';

describe('ProjectMamagementComponent', () => {
  let component: ProjectMamagementComponent;
  let fixture: ComponentFixture<ProjectMamagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMamagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectMamagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
