import { Component, OnInit } from '@angular/core';
import { Fivewhys } from '../../../core/models/LSS_models/Fivewhys';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Whys } from '../../../core/models/LSS_models/Whys';

@Component({
  selector: 'ngx-fivewhys',
  templateUrl: './fivewhys.component.html',
  styleUrls: ['./fivewhys.component.scss']
})
export class FivewhysComponent implements OnInit {
  fiveWhys$: Observable<Fivewhys[]> = of([]);
  showError = false; // Flag to show or hide the error message
  fiveWhys: Fivewhys[] = [];
  projectCharterId: string | null = null; // Use null to represent no charter selected
  problemForm: FormGroup;
  why1Form: FormGroup;
  why2Form: FormGroup;
  why3Form: FormGroup;
  why4Form: FormGroup;
  why5Form: FormGroup;
  showAddForm: boolean = false;
  showDisplayData: boolean = true;  // Initially show the displayed data
  noCharterSelectedMessage: string = ''; 
hasFivewhys: boolean= false;
  categories: string[] = [
    'Financial',
    'Operational',
    'HR',
    'Competition',
    'Technological',
    'Regulatory',
    'Strategic',
    'Marketing',
    'Customer',
    'Management',
    'Environmental'
  ];
  solutionForm: FormGroup; // Form for Solution
  showSolutionFormId: string | null = null; 
  editingFiveWhys: Fivewhys | null = null;

  updateForm: FormGroup; // Form for updating Five Whys
  editingFiveWhysId: string | null = null; // ID of the Five Whys being edited

  constructor(private service: SIPOCserviceService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForms();
    this.loadFiveWhys();
    this.service.selectedCharterId$.subscribe(id => {
      this.projectCharterId = id;
      //this.loadFiveWhys(); 
      this.loadfives(id);
    });
  }

  initializeForms() {
    this.updateForm = this.fb.group({
      problem_statement: ['', Validators.required],
      root_cause_fivewhys: ['', Validators.required],
      category: ['', Validators.required], 
      whys: this.fb.array([]), 
      solution_fivewhys: this.fb.array([]) 
    });
    this.solutionForm= this.fb.group({
      description_solution: ['', Validators.required]
    });
    this.problemForm = this.fb.group({
      problemStatement: ['', Validators.required],
      category: ['', Validators.required] 

    });

    this.why1Form = this.fb.group({
      why1: ['', Validators.required]
    });

    this.why2Form = this.fb.group({
      why2: ['', Validators.required]
    });

    this.why3Form = this.fb.group({
      why3: ['', Validators.required]
    });

    this.why4Form = this.fb.group({
      why4: ['', Validators.required]
    });

    this.why5Form = this.fb.group({
      why5: ['', Validators.required]
    });// Initialize Solution form
  }
 
  submitProblemForm() {
    if (this.problemForm.invalid) {
      this.problemForm.markAllAsTouched();
    }
  }

  submitWhyForm(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
    }
  }
  toggleSolutionForm(fiveWhyId: string) {
    if (this.showSolutionFormId === fiveWhyId) {
      this.showSolutionFormId = null; // Hide the form if already showing
    } else {
      this.showSolutionFormId = fiveWhyId; // Show the form for the selected FiveWhy
    }
  }
  
  showSolutionFormFor(fiveWhyId: string): boolean {
    return this.showSolutionFormId === fiveWhyId;
  }
  
  addSolution(fiveWhyId: string) {
    if (this.solutionForm.valid) {
      const solution = this.solutionForm.value;
      this.service.addSolutionToFivewhys(fiveWhyId, solution).subscribe({
        next: (updatedFivewhys: Fivewhys) => {
          console.log('Solution added successfully:', updatedFivewhys);
          this.resetSolutionForm();
          this.loadFiveWhys(); // Reload data to reflect changes
        },
        error: (err) => {
          console.error('Error adding solution:', err);
        }
      });
    } else {
      console.error('Solution form is invalid');
    }
  }
  
  resetSolutionForm() {
    this.solutionForm.reset();
    this.showSolutionFormId = null; // Hide form after submission or reset
  }
  confirmAdd() {
    if (this.problemForm.valid && this.why1Form.valid && this.why2Form.valid && this.why3Form.valid && this.why4Form.valid && this.why5Form.valid) {
      const whys: Whys[] = [
        { id_why: '', answer_why: this.why1Form.value.why1 },
        { id_why: '', answer_why: this.why2Form.value.why2 },
        { id_why: '', answer_why: this.why3Form.value.why3 },
        { id_why: '', answer_why: this.why4Form.value.why4 },
        { id_why: '', answer_why: this.why5Form.value.why5 }
      ];

      const fivewhys: Fivewhys = {
        id_fivewhys: '',
        idproject: this.projectCharterId || '',
        problem_statement: this.problemForm.value.problemStatement,
        root_cause_fivewhys: '',
        whys: whys,
        categorieProblem: this.problemForm.value.category,
        solution_fivewhys: []
      };

      console.log('Submitting Five Whys:', fivewhys);

      this.service.addFiveWhys(fivewhys, this.projectCharterId || '').subscribe(
        response => {
          console.log('Five Whys added successfully:', response);
          this.resetForms();
          this.showAddForm = false;
          this.showDisplayData = true;
          this.loadFiveWhys();
        },
        error => {
          console.error('Error adding Five Whys:', error);
          console.error('Error details:', error.error);
        }
      );
    } else {
      this.problemForm.markAllAsTouched();
      this.submitWhyForm(this.why1Form);
      this.submitWhyForm(this.why2Form);
      this.submitWhyForm(this.why3Form);
      this.submitWhyForm(this.why4Form);
      this.submitWhyForm(this.why5Form);
    }
  }

  cancelAdd(): void {
    this.resetForms();
    this.showAddForm = false;
    this.showDisplayData = true;
    this.loadFiveWhys();
    this.showError = false; // Hide error message when canceling
  }

  resetForms(): void {
    this.problemForm.reset();
    this.why1Form.reset();
    this.why2Form.reset();
    this.why3Form.reset();
    this.why4Form.reset();
    this.why5Form.reset();
  } // Initialize or populate whys form array
  initializeUpdateForm(fiveWhy: Fivewhys) {
    // Patch values for basic fields
    this.updateForm.patchValue({
      problem_statement: fiveWhy.problem_statement,
      root_cause_fivewhys: fiveWhy.root_cause_fivewhys,
      category: fiveWhy.categorieProblem

    });
  
    // Get the FormArray for whys and clear existing controls
    const whysArray = this.updateForm.get('whys') as FormArray;
    whysArray.clear();
  
    // Get the FormArray for solutions and clear existing controls
    const solutionArray = this.updateForm.get('solution_fivewhys') as FormArray;
    solutionArray.clear();
  
    // Add controls for each why
    fiveWhy.whys.forEach(why => {
      whysArray.push(this.fb.group({
        answer_why: [why.answer_why, Validators.required]
      }));
    });
  
    // Add controls for each solution
    fiveWhy.solution_fivewhys.forEach(solution => {
      solutionArray.push(this.fb.group({
        description_solution: [solution.description_solution, Validators.required]
      }));
    });
  
    // Set the currently editing FiveWhys object
    this.editingFiveWhys = fiveWhy;
  }
  
 
  editFiveWhys(fiveWhy: Fivewhys) {
    this.initializeUpdateForm(fiveWhy); // Initialize form with selected data
    this.editingFiveWhys = fiveWhy; // Set the item being edited
  }
  
  cancelUpdate() {
    this.editingFiveWhys = null; // Clear editing state
    this.updateForm.reset(); // Reset form values
  }
  
  updateFivewhys() {
    if (this.updateForm.valid) {
      const updatedFivewhys: Fivewhys = {
        ...this.editingFiveWhys!,
        problem_statement: this.updateForm.value.problem_statement,
        root_cause_fivewhys: this.updateForm.value.root_cause_fivewhys,
        categorieProblem:this.updateForm.value.category,
        whys: (this.updateForm.get('whys') as FormArray).controls.map((control, index) => ({
          id_why: this.editingFiveWhys?.whys[index]?.id_why || '',
          answer_why: (control as FormGroup).value.answer_why
        })),
        solution_fivewhys: (this.updateForm.get('solution_fivewhys') as FormArray).controls.map((control, index) => ({
          id_solution: this.editingFiveWhys?.solution_fivewhys[index]?.id_solution || '',
          description_solution: (control as FormGroup).value.description_solution
        }))
      };

      this.service.updateFivewhys(this.editingFiveWhys!.id_fivewhys, updatedFivewhys).subscribe({
        next: (response) => {
          console.log('Five Whys updated successfully:', response);
          this.loadFiveWhys(); // Reload data to reflect changes
          this.cancelUpdate();
        },
        error: (err) => {
          console.error('Error updating Five Whys:', err);
        }
      });
    }
  }

  
  loadFiveWhys() {
    this.fiveWhys$ = this.service.selectedCharterId$.pipe(
      switchMap(charterId => {
        if (charterId) {
          return this.service.getFivewhysByProjectCharterId(charterId).pipe(
            catchError(error => {
              console.error('Error fetching Five Whys:', error);
              return of([]); // Return empty array in case of error
            })
          );
        } else {
          return of([]); // Return empty array if no charter ID is selected
        }
      })
    );

    this.fiveWhys$.subscribe(data => {
      this.fiveWhys = data;
    });
  }

  loadfives(projectCharterId: string): void {
    this.service.getFivewhysByProjectCharterId(projectCharterId).subscribe(fives => {
      this.fiveWhys = fives;
      if (fives.length > 0) {
        this.hasFivewhys = true; // Set flag to true if SIPOC exists
        this.noCharterSelectedMessage = '';

      } else {
        this.hasFivewhys = false; // Set flag to false if SIPOC does not exist
        this.noCharterSelectedMessage = '';
      }
    });
  }
  deleteFiveWhys(fivewhysId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');

    if (confirmed) {
      this.service.deleteFiveWhys(fivewhysId).subscribe({
        next: () => {
          this.fiveWhys = this.fiveWhys.filter(item => item.id_fivewhys !== fivewhysId);
          this.loadFiveWhys();
        },
        error: (err) => {
          console.error('Error deleting Five Whys:', err);
        }
      });
    }
  }

  addFiveWhy() {
    if (!this.projectCharterId) {
      this.noCharterSelectedMessage = 'Please select a Project Charter.';
      this.showError = true;
      this.showAddForm = false; // Ensure the form is not shown
    } else {
      this.noCharterSelectedMessage = ''; // Clear any previous error message
      this.showError = false;
      this.showAddForm = true;
      this.showDisplayData = false;
    }
  }
}
