import { Injectable } from '@angular/core';
import { Router, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let currentUser = localStorage.getItem('identity')
    console.log(!currentUser)
    if (currentUser) {
      return true
    }
    this._router.navigate(['/auth/signup'])
    return false;
  }
}
