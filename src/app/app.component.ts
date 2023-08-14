import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public company: string = '';

  constructor(private readonly keycloak: KeycloakService,
              private http: HttpClient) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  loginWithGoogle() {
    this.keycloak.login({ idpHint: 'google' });
  }

  sendCompany() {
    // send the company to the backend using http
    this.http.post('https://localhost:7247/api/clients', {name: this.company}).subscribe((data) => console.log(data));
  }
}
