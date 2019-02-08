import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  public title: string;
  public user: User;
  public loggedIn;
  public status: string;
  public loading: boolean;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService) {
      this.title = 'Restore Password';
      this.user = new User(null, '', '', '', '', '', '', '');
      this._authService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn)
      this.loading = true
  }

  ngOnInit() {
    console.log('RestorePassword.component cargado correctamente.');
    this.loading = false
  }

  onSubmit(form) {
    this.loading = true
    this._authService.accountStatus(this.user.email).subscribe((res: any) => {
      if (res.code === 'AU01') {
        this._router.navigate(['/auth/verify-email'], { queryParams: { email: this.user.email, re: true } })
      } else if (res.code === 'US00') {
      } else {
        this._authService.sendEmailRestorePassword(this.user).subscribe((res: any) => {
          this._router.navigate(['/auth/confirmation-message/success-email'])
        })
      }
    })
  }

}
