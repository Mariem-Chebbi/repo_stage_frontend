import { Component, OnDestroy, OnInit } from '@angular/core';
import { SprintService } from '../../../../core/services/safe/sprint.service';
import { Subscription } from 'rxjs';
import { NbThemeService } from '@nebular/theme';
import { TaskServices } from '../../../../core/services/safe/taskService/task.service';
import { UserstoryService } from '../../../../core/services/safe/userstory.service';
import { FeatureService } from '../../../../core/services/safe/feature.service';

@Component({
  selector: 'ngx-sprint-charts',
  templateUrl: './sprint-charts.component.html',
  styleUrls: ['./sprint-charts.component.scss']
})
export class SprintChartsComponent implements OnInit, OnDestroy {
  totalFeatures: number = 0;
  totalSprints: number = 0;
  totalUs: number = 0;
  totalTasks: number = 0;
  previousTotalSprints: number = 0; // Adjust as needed
  percentageIncrease: number = 0;
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private theme: NbThemeService,
    private sprintService: SprintService,
    private taskService: TaskServices,
    private usService: UserstoryService,
    private featureService:FeatureService
  ) { }

  ngOnInit() {
    // Fetch sprint stats
    this.dataSubscription.add(
      this.sprintService.getSprintStats().subscribe(
        stats => {
          console.log('Sprint API Response:', stats);
          const totalSprints = stats['Total Sprints'];
          if (totalSprints !== undefined) {
            this.totalSprints = totalSprints;

            // Calculate the percentage increase
            if (this.previousTotalSprints > 0) {
              this.percentageIncrease = ((this.totalSprints - this.previousTotalSprints) / this.previousTotalSprints) * 100;
            } else {
              this.percentageIncrease = 0; // No increase if previousTotalSprints is 0
            }
          } else {
            console.error('Expected "Total Sprints" property missing in response', stats);
          }
        },
        error => {
          console.error('Error fetching sprint stats', error);
        }
      )
    );

    // Fetch task stats
    this.dataSubscription.add(
      this.taskService.getTaskCount().subscribe(
        stats => {
          console.log('Task API Response:', stats);
          this.totalTasks = stats['Total Tasks'] || 0; // Adjust based on the actual response structure
        },
        error => {
          console.error('Error fetching task stats', error);
        }
      )
    );

    // Fetch user story stats
    this.dataSubscription.add(
      this.usService.getUSCount().subscribe(
        stats => {
          console.log('User Story API Response:', stats);
          this.totalUs = stats['Total US'] || 0; // Directly assign the number
        },
        error => {
          console.error('Error fetching user story stats', error);
        }
      )
    );

  // Fetch feature stats
    this.dataSubscription.add(
      this.featureService.getfeaturescount().subscribe(
        stats => {
          console.log('Features API Response:', stats);
          this.totalFeatures = stats['Total feature'] || 0; // Use the correct key
        },
        error => {
          console.error('Error fetching features stats', error);
        }
      )
    );
    
    
    
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
