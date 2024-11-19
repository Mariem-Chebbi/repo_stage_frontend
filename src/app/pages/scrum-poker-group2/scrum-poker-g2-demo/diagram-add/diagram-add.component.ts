import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';
import {DiagramModel} from '../../../../core/models/poker_planning_grp2_models/DiagramModel';

@Component({
  selector: 'ngx-diagram-add',
  templateUrl: './diagram-add.component.html',
  styleUrls: ['./diagram-add.component.scss']})
export class DiagramAddComponent implements OnInit {
  addDiagramForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<DiagramAddComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.addDiagramForm = this.fb.group({
      stptitle: ['', Validators.required],
      stpDescription: ['', Validators.required],
    });
  }

  confirmAdd() {
    if (this.addDiagramForm.valid) {
      if (confirm('Are you sure you want to add this information?')) {
        this.addDiagram();
      }
    } else {
      this.toastrService.danger('Please fill in all fields', 'Error');
    }
  }

  addDiagram() {
    const newDiagram: DiagramModel = this.addDiagramForm.value;
    this.apiService.addDiagram(newDiagram).subscribe(
      (diagram) => {
        this.toastrService.success('diagram added successfully', 'Success');
        this.ref.close(diagram);
      },
      (error) => {
        console.error('Error adding the diagram:', error);
        this.toastrService.danger('Failed to add the diagram', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }

}
