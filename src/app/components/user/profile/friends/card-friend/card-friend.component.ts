import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../../services/user.service'
import { GLOBAL } from './../../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faPlusCircle, faUsers, faImages, faClone, faUserMinus, faClock, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-friend',
  templateUrl: './card-friend.component.html',
  styleUrls: ['./card-friend.component.css']
})
export class CardFriendComponent implements OnInit {
  @Input() public friend;

  public token;
  public identity;
  public url;
  faPlusCircle = faPlusCircle
  faUserMinus = faUserMinus
  faClock = faClock
  faBan = faBan
  faCheckCircle = faCheckCircle
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

    this.url = GLOBAL.url
    this._route.parent.params.subscribe(param => {
      const username = param.username
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

  ngOnInit() {
  }

}
