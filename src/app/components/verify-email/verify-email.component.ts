import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { AuthService } from 'src/app/services/auth.service';

import {SnotifyService} from 'ng-snotify';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  public re;
  public email;
  public verifyAccount;
  public verifyAccountMessage;
  public loading: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private snotifyService: SnotifyService

  ) {
    this.loading = true
  }

  ngOnInit() {
    console.log('verifyEmail.component cargado')
    this._activatedRoute.queryParamMap.subscribe(query => {
      this.loading = true
      if (query.keys.length === 1 && query.get('email')) {
        this.loading = true
        this.re = false
        this.email = query.get('email')
        this.verifyAccountStatus(query.get('email'))
      } else if (query.keys.length === 2 && query.get('email') && query.get('re')) {
        this.loading = true
        this.re = true
        this.email = query.get('email')
        this.verifyAccountStatus(query.get('email'))
      } else if (query.keys.length === 1 && query.get('code')) {
        this._authService.verifyAccount(query.get('code')).subscribe((res: any) => {
          this.loading = true
          console.log(res)
          if (res.code === 'AU04') {
            this.verifyAccount = true;
            this.verifyAccountMessage = res.message
          } else if (res.code === 'AU03') {
            this.verifyAccount = false;
            this.verifyAccountMessage = res.message
          } else {
            this._router.navigate(['auth/signup'])
          }
          this.loading = false
        })
      }
      else {
        this._router.navigate(['/auth/signup'])
      }
    })
  }

  verifyAccountStatus(email) {
    this._authService.accountStatus(email).subscribe((resp: any) => {
      this.loading = true
      if (resp.code === 'GL99') {
        this._router.navigate([{ outlets: { auth: 'signup' } }])
      }
      this.loading = false
    })
  }

  resendEmail(email) {
    this.loading = true
    this._authService.reSendEmail(email).subscribe((res: any) => {
      if (res.code === 'GL99') {
        this._router.navigate([{ outlets: { auth: 'verify-email' } }], { queryParams: { email: email } })
      } else {
        this.snotifyService.error(res.message);
        window.alert(res.message)
      }
      this.loading = false
    })
  }

}
