import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/';
import { User } from 'src/app/models/user';

import {SnotifyService} from 'ng-snotify';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restore-password-change',
  templateUrl: './restore-password-change.component.html',
  styleUrls: ['./restore-password-change.component.css']
})

export class RestorePasswordChangeComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  registerForm: FormGroup;
  submitted = false;
  public loading: boolean;
  public encode;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private snotifyService: SnotifyService,
    private formBuilder: FormBuilder) {
      this.title = 'Change Password';
      this.loading = true
  }

  ngOnInit() {
    console.log('RestorePassword.component cargado correctamente.');
    this.registerForm = this.formBuilder.group({
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['']
    }, { validator: this.checkPasswords });
    this._route.paramMap.subscribe((params: any) => {
      this.encode = params.get('code')
      this.loading = true
      this.loading = false
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit(form) {
    this.loading = true
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false
      return;
    }
    this._authService.restorePassword(this.encode, this.registerForm.value.password1).subscribe((res:any) => {
      this._router.navigate(['/auth/confirmation-message/success-restore'])
      this.loading = false
    }, err => {
      this.snotifyService.error(err.error.message);
      console.log(err)
    })
  }

  checkPasswords(group: FormGroup) {
    let password1 = group.controls.password1.value;
    let password2 = group.controls.password2.value;

    return password1 === password2 ? null : { notSame: true }
  }

}
