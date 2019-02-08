import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {SnotifyService} from 'ng-snotify';
import { User } from 'src/app/models/user';

import { AuthService } from '../../services/auth.service';
import { async } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public loggedIn;
  public status: string;
  public loading: boolean;
  public identity;
  public token;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private snotifyService: SnotifyService
    ) {
      this.title = 'Signup';
      this.user = new User(0, '', '', '', '', '', '', '');
      // this._authService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn)
      this.loading = true
  }

  ngOnInit() {
    console.log('login.component cargado correctamente.');
    this.loading = false
  }

  onSubmit(form) {
    this.loading = true;
    this._authService.signup(this.user).subscribe(async (resp: any) => {
      if (resp.code === 'GL99') {
        this.identity = resp.message
        if (!this.identity && !this.identity.username) {
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity))
          await this.getToken()
          this._authService.userLoggedInWS(this.identity.username)
          this._router.navigate(['/'])
        }
      } else if (resp.code === 'AU01') {
        this.snotifyService.error(resp.message);
        this._router.navigate(['/auth/verify-email'], { queryParams: { email: this.user.email, re: true } })
      } else {
        alert(resp.message)
        console.log(resp.message)
      }
    }, (error) => {
      this.loading = false;
      this.snotifyService.error(error.error.message);
    })
  }

  restorePassword() {
    this._router.navigate(['/auth/restore-password'])
  }

  getToken() {
    this._authService.signup(this.user, true).subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.token = resp.message
        if (!this.token.length) {
        } else {
          localStorage.setItem('token', this.token)
        }
      }
    }, (error) => {
      this.snotifyService.error(error.error.message);
      this.loading = false;
    })
  }
}
