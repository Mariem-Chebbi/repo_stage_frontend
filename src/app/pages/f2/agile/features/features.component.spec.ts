import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesComponent } from './features.component';
import { FeaturesService } from '../../../core/FDDG2_Services/features.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Feature, State } from '../../../core/FDDG2_Models/feature';
import { User } from '../../../core/FDDG2_Models/user';
import { Tasks } from '../../../core/FDDG2_Models/tasks';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;
  let featuresService: jasmine.SpyObj<FeaturesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const featuresServiceSpy = jasmine.createSpyObj('FeaturesService', [
      'getProjectFeatures',
      'addFeature',
      'addsubFeature',
      'updateFeature',
      'getSubFeaturesForFeature',
      'getAllusers',
      'updateSubFeature'
    ]);
    
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [ FeaturesComponent ],
      providers: [
        { provide: FeaturesService, useValue: featuresServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    featuresService = TestBed.inject(FeaturesService) as jasmine.SpyObj<FeaturesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Mock service methods
    featuresService.getProjectFeatures.and.returnValue(of([]));
    featuresService.addFeature.and.returnValue(of({} as Feature));
    featuresService.addsubFeature.and.returnValue(of({}));
    featuresService.updateFeature.and.returnValue(of({}));
    featuresService.getSubFeaturesForFeature.and.returnValue(of([]));
    featuresService.getAllusers.and.returnValue(of([]));
    featuresService.updateSubFeature.and.returnValue(of({}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load features on init', () => {
    const mockFeatures: Feature[] = [
      { id: '1', name: 'Feature 1', description: 'Description 1', progress: 0, subFeatures: [], state: State.ToDo, expanded: true },
      { id: '2', name: 'Feature 2', description: 'Description 2', progress: 0, subFeatures: [], state: State.Completed, expanded: true }
    ];
    featuresService.getProjectFeatures.and.returnValue(of(mockFeatures));
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.sourceFeatures.length).toBe(1); // Only ToDo state
    expect(component.targetFeatures.length).toBe(1); // Only Completed state
  });

  it('should handle adding a feature', () => {
    const newFeature: Feature = { name: 'New Feature', description: 'Description', progress: 0, subFeatures: [], state: State.ToDo, expanded: true };
    featuresService.addFeature.and.returnValue(of(newFeature));
    
    component.newFeature = newFeature;
    component.addFeature();
    
    expect(featuresService.addFeature).toHaveBeenCalledWith(newFeature, '1');
    expect(component.displayDialog).toBeFalsy();
  });

  it('should update feature state', () => {
    const feature: Feature = { id: '1', name: 'Feature 1', description: 'Description 1', progress: 0, subFeatures: [], state: State.ToDo, expanded: true };
    featuresService.updateFeature.and.returnValue(of(feature));
    
    component.updateFeatureState(feature);
    
    expect(featuresService.updateFeature).toHaveBeenCalledWith(feature);
  });

  it('should navigate to pending tasks', () => {
    component.navigateToPendings();
    expect(router.navigate).toHaveBeenCalledWith(['/pages/agile/PM/pendingTasks']);
  });

  it('should add sub-feature to feature', () => {
    const subFeature: Tasks = { taskId: '1', taskName: 'Task 1', description: 'Sub-task description', userId: '', assignemnt: '', assignemntUrl: '', createdAt: '', deadline: '', status: State.ToDo };
    const featureId = '1';
    featuresService.addsubFeature.and.returnValue(of(subFeature));

    component.addSubFeature(subFeature, featureId);

    expect(featuresService.addsubFeature).toHaveBeenCalledWith(subFeature, featureId);
  });

  it('should handle user assignment to sub-feature', () => {
    const user: User = { id: '1', username: 'User 1'};
    const subFeature: Tasks = { taskId: '1', taskName: 'Task 1', description: 'Sub-task description', userId: '1', assignemnt: '', assignemntUrl: '', createdAt: '', deadline: '', status: State.ToDo };
    component.users = [user];
    featuresService.updateSubFeature.and.returnValue(of(subFeature));
    
    component.assignUserToSubFeature(subFeature);
    
    expect(featuresService.updateSubFeature).toHaveBeenCalledWith(subFeature);
  });
});
