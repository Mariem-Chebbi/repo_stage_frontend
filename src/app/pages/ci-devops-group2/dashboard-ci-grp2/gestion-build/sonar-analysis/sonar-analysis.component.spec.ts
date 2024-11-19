import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarAnalysisComponent } from './sonar-analysis.component';

describe('SonarAnalysisComponent', () => {
  let component: SonarAnalysisComponent;
  let fixture: ComponentFixture<SonarAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonarAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SonarAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
