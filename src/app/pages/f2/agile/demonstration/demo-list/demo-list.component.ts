import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Demonstration } from '../../../../../core/FDDG2_Models/demonstration';
import { DemonstrationService } from '../../../../../core/FDDG2_Services/demonstration.service';
import { Router } from '@angular/router';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if (!value) return '';
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
@Component({
  selector: 'ngx-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent implements OnInit {
  demonstrations: Demonstration[] = [];

  ngOnInit(): void {
    this.fetchDemo();
  }

  constructor(private demoService: DemonstrationService, private router: Router) { }

  fetchDemo(): void {
    this.demoService.getAllDemos()
      .subscribe({
        next: (demonstrations) => {
          this.demonstrations = demonstrations;
        },
        error: (error) => {
          console.error(error)
        }
      })
  }
  navigateToDetails(codeDemo: string): void {
    this.router.navigate(['/pages/agile/demo/demoDetails/', codeDemo]);
  }
  navigateToAdd(): void {
    this.router.navigate(['/pages/agile/demo/addDemo/']);
  }

  deleteDemo(demo: Demonstration): void {
    if (confirm("Are you sure to delete " + demo.title)) {
      this.demoService.delete(demo.codeDemo).subscribe(() => {

      })
    }

    this.fetchDemo();
  }


}
