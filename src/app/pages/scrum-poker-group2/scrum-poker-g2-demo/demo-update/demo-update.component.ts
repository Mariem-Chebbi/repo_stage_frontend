import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {DemoModel} from '../../../../core/models/poker_planning_grp2_models/DemoModel';
import {ApiService} from '../../../../core/services/poker_planning_grp2_services/api-service.service';
@Component({
  selector: 'ngx-demo-update',
  templateUrl: './demo-update.component.html',
  styleUrls: ['./demo-update.component.scss']})

export class DemoUpdateComponent  implements OnInit {
  demo: DemoModel;
  demos: DemoModel[];

  constructor(
    private route: ActivatedRoute,
    protected ref: NbDialogRef<DemoUpdateComponent>,
    private apiService: ApiService,
    private router: Router,
    private toastrService: NbToastrService,

  ) {}

  ngOnInit() {
    this.apiService.getDemo().subscribe((demos: DemoModel[]) => {
      this.demos = demos;
    });
  }

  @Input() title: string;

  confirmUpdate() {
    if (confirm('Are You sure you want to update this definition ?')) {
      this.updateDemo();
    }
  }

  updateDemo() {
    this.apiService.updateDemo(this.demo.id, this.demo).subscribe(updatedDemo => {
      const index = this.demos.findIndex(d => d.id === updatedDemo.id);
      if (index !== -1) {
        this.demos[index] = updatedDemo;
        this.toastrService.success('definition updated ', 'Succès');

      }

      this.ref.close();

      this.router.navigate(['/pages/agile/scrum-poker-group2']);
    }, error => {
      console.error('Failed to add the definition', error);
    });
  }

  onDescriptionChange(demo: DemoModel): void {
    this.demo = demo;
  }

  cancel() {
    this.ref.close();
  }
}
