import { Injectable } from '@angular/core';
import {OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {ActivatedRoute, Router} from '@angular/router';
import {authConfig} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  private configureOAuth() {
    this.oauthService.configure(authConfig());
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.setStorage(localStorage);
  }

  constructor(private oauthService: OAuthService) {
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
