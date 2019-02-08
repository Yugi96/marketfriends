import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loading: boolean;
  public identity;
  public token;

  faArrowLeft = faArrowLeft;

  constructor(
    private _authService: AuthService,
    private _userServie: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loading = false;
    this.identity = this._userServie.getIdentity()
    this.token = this._userServie.getToken()
  }

  ngOnInit() {
  }

}
