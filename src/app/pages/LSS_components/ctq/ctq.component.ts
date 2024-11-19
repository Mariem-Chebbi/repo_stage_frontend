import { Component, OnInit } from '@angular/core';
import { Requirement } from '../../../core/models/LSS_models/Requirement';
import { DmadvserviceService } from '../../../core/services/LSS_services/dmadvservice.service';
import { Ctq } from '../../../core/models/LSS_models/Ctq';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-ctq',
  templateUrl: './ctq.component.html',
  styleUrls: ['./ctq.component.scss']
})
export class CtqComponent implements OnInit {
  requirements: Requirement[] = [];
  selectedCharterId: string | null = null;
  noCharterSelectedMessage: string = 'Please select a project charter to view requirements.';
  noReqMessage: string = 'No requirements found for the selected project charter.';
  hasReq: boolean = false;
  showAddForm: boolean = false;
  newRequirement: Requirement = {
    description: '', ctqs: [{
      description: '',
      id: '',
      score: []
    }],
    id: '',
    projectid: ''
  };
  addCtqForm: FormGroup;
  showAddCtqFormId: string | null = null; // To track which requirement is currently showing the CTQ form
  editForm: FormGroup;
  requirementToEdit: Requirement | null = null;
  showEditForm: boolean = false;

  RequForm: FormGroup; 

  constructor(private requirementService: DmadvserviceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.requirementService.selectedCharterId$.subscribe(charterId => {
      console.log('Received charter ID:', charterId); // Check if charterId is being logged
      this.selectedCharterId = charterId;
      if (charterId) {
        this.loadRequirements(charterId);
      } else {
        this.requirements = [];
        this.hasReq = false;
      }
    });

    this.RequForm = this.fb.group({
      description_req: ['', Validators.required]
    });
    this.addCtqForm = this.fb.group({
      ctq_description: ['', Validators.required]
    });
    this.editForm = this.fb.group({
      description_requ: ['', Validators.required],
      ctqs: this.fb.array([])
    });
    this.addCtqControls();
  }
  
  loadRequirements(charterId: string): void {
    this.requirementService.getRequirementsByProjectCharterId(charterId).subscribe(
      (data: Requirement[]) => {
        this.requirements = data;
        this.hasReq = data.length > 0;
      },
      (error) => {
        console.error('Error fetching requirements:', error);
      }
    );
  }

  openAddRequirementForm(): void {
    // Show the form for adding a new requirement
    this.showAddForm = true;
  }

  cancelAdd(): void {
    // Hide the form and reset the new requirement
    this.showAddForm = false;
    this.newRequirement = {
      description: '', ctqs: [{
        description: '',
        id: '',
        score: []
      }],
      id: '',
      projectid: this.selectedCharterId 
    };
    this.RequForm.reset();
    this.addCtqControls();
  }

  addCtqControls(): void {
    this.newRequirement.ctqs.forEach((ctq, index) => {
      this.RequForm.addControl('ctq' + index, this.fb.control(ctq.description, Validators.required));
    });
  }

  addCtqInput(): void {
    const newIndex = this.newRequirement.ctqs.length;
    this.newRequirement.ctqs.push({
      description: '',
      id: '',
      score: []
    });
    this.RequForm.addControl('ctq' + newIndex, this.fb.control('', Validators.required));
  }

  submitRequirement(form: FormGroup): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    if (this.selectedCharterId) {
      this.newRequirement.description = form.get('description_req')?.value;
      this.newRequirement.ctqs = this.newRequirement.ctqs.map((ctq, index) => {
        ctq.description = form.get('ctq' + index)?.value;
        return ctq;
      }).filter(ctq => ctq.description.trim() !== '');

      this.requirementService.addRequirement(this.newRequirement, this.selectedCharterId).subscribe(
        (createdRequirement: Requirement) => {
          this.requirements.push(createdRequirement); // Update the list with the new requirement
          this.cancelAdd(); // Hide the form
        },
        (error) => {
          console.error('Error adding requirement:', error);
        }
      );
    }
  }

  addCtq(requirementId: string, ctqDescription: string): void {
    if (this.RequForm.valid) {
      const newCtq: Ctq = { description: ctqDescription, id: null, score: [] };
      this.requirementService.addCtq(requirementId, newCtq).subscribe(
        (updatedRequirement: Requirement) => {
          // Find the requirement and update it with the new CTQ
          const requirement = this.requirements.find(req => req.id === requirementId);
          if (requirement) {
            requirement.ctqs.push(newCtq);
          }
        },
        (error) => {
          console.error('Error adding CTQ:', error);
        }
      );
    }
  }

  deleteCtq(requirementId: string, ctqIndex: number) {
    const confirmed = confirm('Are you sure you want to delete this CTQ?');
    if (confirmed) {

    const ctqsArray = this.editForm.get('ctqs') as FormArray;
    const ctqId = this.requirementToEdit.ctqs[ctqIndex].id; // Assuming CTQ has an `id` field

    this.requirementService.removeCtq(requirementId, ctqId).subscribe(updatedRequirement => {
      ctqsArray.removeAt(ctqIndex);
      this.requirementToEdit = updatedRequirement;
    });}
  }
  deleteRequirement(requirementId: string): void {
    const confirmed = confirm('Are you sure you want to delete this requirement?');
    if (confirmed) {
      this.requirementService.deleteRequirement(requirementId).subscribe(
        () => {
          this.requirements = this.requirements.filter(req => req.id !== requirementId);
        },
        (error) => {
          console.error('Error deleting requirement:', error);
        }
      );
    }
  }

  showAddCtqForm(requirementId: string): void {
    this.showAddCtqFormId = requirementId;
  }

  cancelAddCtqForm(): void {
    this.showAddCtqFormId = null;
    this.addCtqForm.reset();
  }

  submitAddCtq(requirementId: string): void {
    if (this.addCtqForm.valid) {
      const ctqDescription = this.addCtqForm.get('ctq_description')?.value;
      const newCtq: Ctq = { description: ctqDescription, id: null, score: [] };

      this.requirementService.addCtq(requirementId, newCtq).subscribe(
        (updatedRequirement: Requirement) => {
          const requirement = this.requirements.find(req => req.id === requirementId);
          if (requirement) {
            requirement.ctqs.push(newCtq);
            this.cancelAddCtqForm(); // Hide the form
          }
        },
        (error) => {
          console.error('Error adding CTQ:', error);
        }
      );
    }
  }
  openEditForm(requirement: Requirement): void {
    this.requirementToEdit = requirement;
    this.initializeUpdateForm(requirement);
    this.showEditForm = true;
  }
  
  
  
  cancelEdit(): void {
    this.showEditForm = false;
    this.requirementToEdit = null;
    this.editForm.reset();
  }
  
  submitEditForm(): void {
    if (this.editForm.valid) {
      const updatedRequirement: Requirement = {
        ...this.requirementToEdit!,
        description: this.editForm.value.description_requ,
        ctqs: (this.editForm.get('ctqs') as FormArray).controls.map((control, index) => ({
          id: this.requirementToEdit?.ctqs[index]?.id || '', // Preserve existing ID or use empty string
          description: control.get('description_ctq')?.value || '', // Use the correct field name
          score:[]
        }))
      };
  
      if (this.selectedCharterId) {
        this.requirementService.updateRequirement(this.requirementToEdit.id, updatedRequirement).subscribe({
          next: (response) => {
            console.log('Requirement updated successfully:', response);
            const index = this.requirements.findIndex(req => req.id === updatedRequirement.id);
            if (index !== -1) {
              this.requirements[index] = updatedRequirement; // Update the list with the updated requirement
            }
            this.cancelEdit(); // Hide the form
          },
          error: (err) => {
            console.error('Error updating requirement:', err);
          }
        });
      }
    }
  }
  
  initializeUpdateForm(requirement: Requirement) {
    // Patch values for basic fields
    this.editForm.patchValue({
      description_requ:requirement.description

    });
  
    const ctqsArray = this.editForm.get('ctqs') as FormArray;
    ctqsArray.clear();
  
    requirement.ctqs.forEach(ctq => {
      ctqsArray.push(this.fb.group({
        description_ctq: [ctq.description, Validators.required]
      }));
    });
  
      this.requirementToEdit = requirement;
  }
  
}