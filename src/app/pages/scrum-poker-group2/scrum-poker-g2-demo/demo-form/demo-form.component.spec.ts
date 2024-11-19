import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../services/api-service.service';
import { DemoFormComponent } from './demo-form.component';

describe('DemoFormComponent', () => {
  let component: DemoFormComponent;
  let fixture: ComponentFixture<DemoFormComponent>;
  let mockApiService;
  let mockToastrService;
  let mockDialogRef;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj(['addNew']);
    mockToastrService = jasmine.createSpyObj(['success', 'danger']);
    mockDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [DemoFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: NbToastrService, useValue: mockToastrService },
        { provide: NbDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    // @ts-ignore
    expect(component.addNewForm.invalid).toBeTrue();
  });

  it('should have a valid form when fields are filled', () => {
    component.addNewForm.controls['title'].setValue('Test Title');
    component.addNewForm.controls['newsDescription'].setValue('Test Description');
    // @ts-ignore
    expect(component.addNewForm.valid).toBeTrue();
  });

  it('should call addBenefit when confirmAdd is called and form is valid', () => {
    spyOn(component, 'addBenefit');

    component.addNewForm.controls['title'].setValue('Test Title');
    component.addNewForm.controls['newsDescription'].setValue('Test Description');
    component.confirmAdd();

    expect(component.addBenefit).toHaveBeenCalled();
  });

  it('should show success message and close dialog on successful addition', () => {
    const mockData = { id: '123', title: 'Test Title', newsDescription: 'Test Description' };
    mockApiService.addNew.and.returnValue(of(mockData));

    component.addNewForm.controls['title'].setValue('Test Title');
    component.addNewForm.controls['newsDescription'].setValue('Test Description');
    component.confirmAdd();

    expect(mockToastrService.success).toHaveBeenCalledWith('Information added successfully', 'Success');
    expect(mockDialogRef.close).toHaveBeenCalledWith(mockData);
  });

  it('should show error message on failed addition', () => {
    mockApiService.addNew.and.returnValue(throwError({ error: 'Error adding the information' }));

    component.addNewForm.controls['title'].setValue('Test Title');
    component.addNewForm.controls['newsDescription'].setValue('Test Description');
    component.confirmAdd();

    expect(mockToastrService.danger).toHaveBeenCalledWith('Failed to add the information', 'Error');
  });

  it('should close dialog when cancel is called', () => {
    component.cancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
