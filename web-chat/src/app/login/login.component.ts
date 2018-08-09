import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private socialAuthService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  // To login from gmail
  public googleLogIn() {
    let socialPlatformProvider;
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // Setting the name of  to local storage
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem('userName', userData.name);
      }
    );
    this.router.navigate(['home']);
  }
}
