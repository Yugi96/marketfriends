import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service'
import { GLOBAL } from './../../../services/global'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { faThumbsUp, faHeart, faAngry, faCommentDots, faPlusCircle, faUsers, faImages, faClone, faUserMinus, faClock, faBan, faCheckCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from './../../../services/notification.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
  faCamera = faCamera

  public identity;
  public token;
  public url: string;
  public loading: boolean;
  public userProfile;
  public codeRequest;

  public showModal;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _notificationService: NotificationService
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
    this.showModal = false;
  }

  ngOnInit() {

    this._userService.friendRequest.subscribe(data => {
      console.log(data)
      if (this.userProfile.username === data.friend) this.codeRequest = data.code
      // if (this.identity.username === data.friend) this.codeRequest = data.code
    })

    this._route.paramMap.subscribe(param => {
      const username = param.get('username')
      if(username) {
        this._userService.getProfile(username).subscribe(resp => {
          if (resp.code === 'GL99') {
            this.userProfile = resp.message
            if (this.userProfile.username !== this.identity.username) {
              this._userService.isFriends(this.userProfile.username).subscribe(resp => {
                this.codeRequest = resp.code
              }, error => {
                console.log('Error: ', error)
              })
            }
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

  closeModal(action) {
    console.log(action)
    this.showModal = action.action
    this.identity.image_profile = action.filename
    localStorage.setItem('identity', JSON.stringify(this.identity))
    this.userProfile.image_profile = action.filename
  }

  actionFriend(action, usernameFriend, code) {
    this._userService.actionFriendRequest(action, usernameFriend).subscribe(resp => {
      console.log(resp)
      this.friendRequest(code)
      if (action === 'accept') this.codeRequest = 'FR02'
      if (action === 'cancel') this.codeRequest = 'FR05'
    }, error => {
      console.log('Error: ', error)
    })
  }

  addFriend(usernameFriend, code) {
    this._userService.addFriend(usernameFriend).subscribe(resp => {
      console.log(resp)
      this.countFriendRequestEmit()
      this.friendRequest(code)
      this.codeRequest = 'FR03'
    }, error => {
      console.log('Error: ', error)
    })
  }

  auto_grow(element, minHeight, border) {
    if (element.value === '') element.style.height = `${minHeight}px`
    if (border) if (element.style.height > 100) element.style.borderRadius = `${border}px`
    element.style.height = (element.scrollHeight)+"px";
  }

  fileChangeEvent(files) {
    console.log(files)
  }

  friendRequest(code) {
    this._userService.friendRequestEmit(this.userProfile.username, this.identity.username, code)
    this._userService.countNotificationEmit({
      id: this.userProfile.id,
      username: this.userProfile.username
    }, {
      id: this.identity.id,
      username: this.identity.username
    })
  }

  countFriendRequestEmit() {
    this._userService.countFriendRequestEmit({
      id: this.userProfile.id,
      username: this.userProfile.username
    }, {
      id: this.identity.id,
      username: this.identity.username
    })
  }

}
