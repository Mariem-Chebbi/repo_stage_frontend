import {Component, Input} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {DiagramModel} from '../../../../core/models/poker_planning_grp2_models/DiagramModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';

@Component({
  selector: 'ngx-diagram-update',
  templateUrl: './diagram-update.component.html',
  styleUrls: ['./diagram-update.component.scss']})
export class DiagramUpdateComponent {
  @Input() title: string;
  @Input() diagram: DiagramModel;

  constructor(
    protected ref: NbDialogRef<DiagramUpdateComponent>,
    private apiService: ApiService,
    private toastrService: NbToastrService,
  ) {}


  confirmUpdate() {
    if (confirm('Are you sure you want to update this information ?')) {
      this.updateDiagram();
    }
  }

  updateDiagram() {
    this.apiService.updateDiagram(this.diagram.id, this.diagram).subscribe(
      () => {
        this.toastrService.success('diagram updated successfully', 'Success');
        this.ref.close();
      },
      (error) => {
        console.error('Error updating the diagram:', error);
        this.toastrService.danger('Failed to update the diagram', 'Error');
      },
    );
  }

  cancel() {
    this.ref.close();
  }

}
