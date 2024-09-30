import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { DefaultModule } from './admin/layouts/default/default.module';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './client/layouts/default/default.component';
import { HeaderComponent } from './client/shared/components/header/header.component';
import { HomepageComponent } from './client/modules/homepage/homepage.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { UserManagementComponent } from './admin/modules/user-management/user-management.component';
import { SettingsComponent } from './admin/modules/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DefaultComponent,
    LoadingComponent,
    HeaderComponent,
    HomepageComponent,
    // UserManagementComponent,
    // SettingsComponent,

    // DefaultComponent,
    // DashboardComponent,
    //SidebarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'your-app-id' }),
    AppRoutingModule,
    FormsModule,
    DefaultModule,
    ReactiveFormsModule,
    HttpClientModule
    

  ],
  providers: [
    provideHttpClient(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
