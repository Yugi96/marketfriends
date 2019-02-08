import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/user/publications/home/home.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component'
import { RestorePasswordComponent } from './components/restore-password/restore-password.component'
import { RestorePasswordChangeComponent } from './components/restore-password-change/restore-password-change.component'
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component'
import { ProfileComponent } from './components/user/profile/profile.component'

import { UserGuardService } from './services/middlewares/user.guard.service';
import { NoUserGuardService } from './services/middlewares/no-user.guard.service';
import { InformationComponent } from './components/user/profile/information/information.component';
import { PhotosComponent } from './components/user/profile/photos/photos.component';
import { FriendsComponent } from './components/user/profile/friends/friends.component';

const appRoutes: Routes = [
  { path:'', component: MainComponent, children: [
    { path: '', redirectTo: 'home' , pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path:'profile/:username', component: ProfileComponent, canActivate: [UserGuardService], children: [
      { path: '', redirectTo: 'publications' , pathMatch: 'full' },
      { path: 'publications', component: HomeComponent },
      { path: 'information', component: InformationComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'friends', component: FriendsComponent },
    ] }
  ] },

  { path: 'auth', component: AuthComponent, canActivate: [NoUserGuardService], children: [
    { path: '', redirectTo: 'signup' , pathMatch: 'full' },
    { path:'signup', component: LoginComponent },
    { path:'signin', component: RegisterComponent },
    { path:'verify-email', component: VerifyEmailComponent },
    { path:'restore-password', component: RestorePasswordComponent },
    { path:'restore-password/:code', component: RestorePasswordChangeComponent },
    { path:'confirmation-message/:type', component: ConfirmationMessageComponent },
  ] },
  { path:'**', redirectTo: 'auth', pathMatch: 'full' }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
