import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoadingModule } from 'ngx-loading';

import { AuthGaurdService } from './auth-gaurd.service';

// Configuration for login from google account
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('668753752787-agqnqhog0p62o76jhq546ac2978l5b54.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}

// Define Routes for the application
const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGaurdService]
}, {
  path: '**',
  component: PageNotFoundComponent
}];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    LoadingModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
