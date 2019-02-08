import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faThumbsUp, faHeart, faAngry, faCommentDots, faPlusCircle, faUsers, faImages, faClone, faUserMinus, faClock, faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  @Input() public friendRequest;

  public token;
  public identity;
  public url;
  public loading;

  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots
  faPlusCircle = faPlusCircle
  faUsers = faUsers
  faImages = faImages
  faClone = faClone
  faUserMinus = faUserMinus
  faClock = faClock
  faBan = faBan
  faCheckCircle = faCheckCircle

  public codeRequest;

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
    console.log(this.friendRequest)
  }

  actionFriend(action, usernameFriend, code) {
    this._userService.actionFriendRequest(action, usernameFriend).subscribe(resp => {
      console.log(resp)
      this.friendRequestWS(code)
      this.countFriendRequestEmit()
      if (action === 'accept') this.codeRequest = 'FR02'
      if (action === 'cancel') this.codeRequest = 'FR05'
    }, error => {
      console.log('Error: ', error)
    })
  }

  countFriendRequestEmit() {
    console.log('1')
    this._userService.countFriendRequestEmit({
      id: this.identity.id,
      username: this.identity.username
    }, {
      id: this.identity.id,
      username: this.identity.username
    })
  }

  friendRequestWS(code) {
    this._userService.friendRequestEmit(this.friendRequest.username, this.identity.username, code)
    this._userService.countNotificationEmit({
      id: this.friendRequest.id,
      username: this.friendRequest.username
    }, {
      id: this.identity.id,
      username: this.identity.username
    })
  }

}
