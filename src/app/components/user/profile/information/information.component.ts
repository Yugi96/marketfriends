import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  public token;
  public identity;
  public url;
  faUserEdit = faUserEdit
  public loading;
  public userProfile;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.userProfile = this.identity
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this._route.parent.params.subscribe(param => {
      const username = param.username
      console.log('aasd',username)
      if(username) {
        this._userService.getProfile(username).subscribe(resp => {
          if (resp.code === 'GL99') {
            this.userProfile = resp.message
          } else {
            console.log(resp.message)
          }
          this.loading = false
        }, err => {
          console.log(err)
        })
      }
    })
  }

}
