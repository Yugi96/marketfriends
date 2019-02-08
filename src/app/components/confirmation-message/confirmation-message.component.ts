import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent implements OnInit {

  public title: string;
  public user: User;
  public loggedIn;
  public status: string;
  public loading: boolean;
  public sendEmail;
  public okRestore;
  public errorCode;
  public type;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService) {
      this.title = 'Confirmation message';
      this._authService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn)
      this.loading = true
      this.sendEmail = false;
      this.okRestore = false;
      this.errorCode = false;
  }

  ngOnInit() {
    console.log('ConfirmationMessage.component cargado correctamente.');
    this._route.paramMap.subscribe((params: any) => {
      this.loading = true
      this.type = params.get('type')
        if (this.type === 'success-email') {
          this.sendEmail = true
        } else if (this.type === 'success-restore') {
          this.okRestore = true
        } else if (this.type === 'error-code') {
          this.errorCode = true
        } else {
          this._router.navigate([''])
        }
        this.loading = false
    })
  }

}
