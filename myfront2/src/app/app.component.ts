import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'myfront2';

  public profile?:KeycloakProfile;
  constructor(protected keycloakService:KeycloakService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const isLoggedIn = await this.keycloakService.isLoggedIn();
      if (isLoggedIn) {
        this.profile = await this.keycloakService.loadUserProfile();
      }
    } catch (err) {
      console.error('Failed to load Keycloak user profile', err);
    }
  }

  //

// login function
  async handleLogin() {
    try {
      await this.keycloakService.login({
        redirectUri: window.location.origin,
      });
    } catch (err) {
      console.error('Login failed', err);
    }
  }
  //logout function

  async handleLogout() {
    try {
      await this.keycloakService.logout(window.location.origin);
    } catch (err) {
      console.error('Logout failed', err);
    }
  }


}
