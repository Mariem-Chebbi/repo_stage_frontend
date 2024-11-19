import { Component } from '@angular/core';
import { BuildService } from '../../../../../core/services/cig2_services/build.service';

@Component({
  selector: 'ngx-build-trigger',
  templateUrl: './build-trigger.component.html',
  styleUrls: ['./build-trigger.component.scss']
})
export class BuildTriggerComponent {

  githubUrl: string = '';
  branch: string = 'main';
  token: string = ''; // Add an input for the token
  buildStatus: string = '';
  buildLog: string = '';

  constructor(private buildService: BuildService) { }

  triggerBuild() {
    const build = {
      githubUrl: this.githubUrl,
      branch: this.branch,
      token: this.token // Include the token in the build object
    };

    this.buildService.triggerBuild(build).subscribe(
      response => {
        this.buildStatus = response.status;
        this.buildLog = response.log;
      },
      error => {
        this.buildStatus = 'FAILED';
        this.buildLog = 'Error triggering build';
      }
    );
  }

}
