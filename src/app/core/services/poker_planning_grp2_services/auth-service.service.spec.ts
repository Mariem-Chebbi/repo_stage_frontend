import {Injectable} from '@angular/core';
import {Issue} from 'jira.js/out/agile';
import {MsalService} from '@azure/msal-angular';
import {AzureDevOpsProject} from '../../models/poker_planning_grp2_models/ImportRepresentation/AzureDevOpsProject';
import {ApiService} from '../../../pages/scrum-poker-group2/services/api-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthAzureServiceService {

  projects: AzureDevOpsProject [] = [];
  isLoggedIn = false ;
  data: Issue;
  us: any;


  constructor(private azureAuthService: MsalService, private Service: ApiService) {
  }

  login() {
    this.azureAuthService.loginPopup()
      .subscribe({
        next: (result) => {
        },
      });
    this.isLoggedIn = true;
  }
}
