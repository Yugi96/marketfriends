import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public token;
  public identity;
  public url;
  faPlusCircle = faPlusCircle
  public loading;
  public userProfile;
  public friends;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()


    this.url = GLOBAL.url
  }

  ngOnInit() {
    this._route.parent.params.subscribe(param => {
      const username = param.username
      this._userService.getProfile(username).subscribe(resp => {
        if (resp.code === 'GL99') {
          this.userProfile = resp.message
          this._userService.showFriendsorRequest(username, 'friends').subscribe(resp => {
            this.friends = resp.message
          }, error => {
            console.log('error: ', error)
          })
        } else {
          console.log(resp.message)
        }
        this.loading = false
      }, err => {
        console.log(err)
      })
    })
  }
}
