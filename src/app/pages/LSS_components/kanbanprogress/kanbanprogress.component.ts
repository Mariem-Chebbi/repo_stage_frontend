import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { BaseChartDirective } from 'ng2-charts';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-kanbanprogress',
  templateUrl: './kanbanprogress.component.html',
  styleUrls: ['./kanbanprogress.component.scss']
})
export class KanbanprogressComponent implements OnInit {
  progress: number = 0;
  private kanbanIdSubscription: Subscription;
  private kanbanId: string | null = null;
  color: any;
  themeSubscription: Subscription;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
constructor(private service: SIPOCserviceService ,private theme: NbThemeService
) {
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
    const colors: any = config.variables;
    this.color = colors;
  });
}
ngOnInit(): void {
  this.kanbanIdSubscription = this.service.selectedKanbanId$.subscribe(kanbanId => {
    this.kanbanId = kanbanId;
    if (kanbanId) {
      this.getKanbanProgress(kanbanId);

    }})
}
getKanbanProgress(kanbanId: string): void {
  this.service.getKanbanProgress(kanbanId).subscribe(
    data => {
      this.progress = Math.round(data.progress);
      if (this.chart) {
        this.chart.update();  // Explicitly update the chart
      }
    },
    error => {
      console.error('Error fetching Kanban progress', error);
    }
  );
}

refreshProgress(): void {
  if (this.kanbanId) {
    this.getKanbanProgress(this.kanbanId);
   
  }
  if (this.chart) {
    this.chart.update();  // Ensure the chart updates with new data
  }
}
}
