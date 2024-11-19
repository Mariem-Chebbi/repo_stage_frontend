import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { KpiService } from '../../../../core/FDDG2_Services/kpi.service';
import { TasksService } from '../../../../core/FDDG2_Services/tasks.service';
import { of } from 'rxjs';
import { NbThemeModule } from '@nebular/theme';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let kpiService: jasmine.SpyObj<KpiService>;
  let tasksService: jasmine.SpyObj<TasksService>;

  beforeEach(async () => {
    const kpiServiceSpy = jasmine.createSpyObj('KpiService', ['getFeatureCompletionRate']);
    const tasksServiceSpy = jasmine.createSpyObj('TasksService', ['getAllTasks']);

    await TestBed.configureTestingModule({
      imports: [NbThemeModule.forRoot()],
      declarations: [DashboardComponent],
      providers: [
        { provide: KpiService, useValue: kpiServiceSpy },
        { provide: TasksService, useValue: tasksServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    kpiService = TestBed.inject(KpiService) as jasmine.SpyObj<KpiService>;
    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;

    kpiService.getFeatureCompletionRate.and.returnValue(of(75));
    tasksService.getAllTasks.and.returnValue(of([
      { status: 'Completed' }, 
      { status: 'NotCompleted' }
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tasks and update counts on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.completedTasksCount).toBe(1);
    expect(component.notCompletedTasksCount).toBe(1);
    expect(component.completionRate).toBe(75);
  });

  it('should update chart options', () => {
    component.updateChartOptions();
    expect(component.options).toBeTruthy();
    expect(component.options.series[0].data.length).toBeGreaterThan(0);
  });
});
