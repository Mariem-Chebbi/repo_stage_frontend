import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JiraAuthService {
  readonly devmindsCloudId = '37d42308-80d9-48d4-921e-79034d8c945e' ;
  jiraApiEndpoint = `https://api.atlassian.com/ex/jira/${this.devmindsCloudId}/rest/api/3`;

  private configureOAuth() {
    this.oauthService.configure(environment.jiraConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.setStorage(localStorage);
  }

  constructor(private oauthService: OAuthService, private route: Router) {
    this.configureOAuth();
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);

      }
    });
  }
  getAccessToken() {
    return this.oauthService.getAccessToken();

  }

  login() {
    this.oauthService.tryLoginCodeFlow().then(() => {
      if (!this.oauthService.hasValidAccessToken()) {
        this.oauthService.initCodeFlow();
      } else {
      }
    });
  }

  logout() {
    this.oauthService.logOut();
  }
}
