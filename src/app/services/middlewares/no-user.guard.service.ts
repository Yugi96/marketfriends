import { Injectable } from '@angular/core';
import { Router, CanActivate, Route } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoUserGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate() {
    let currentUser:any = localStorage.getItem('identity')
    if (!currentUser) {
      return true
    } else {
      this._router.navigate(['/home'])
    }
  }
}
