import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { GLOBAL } from './../../services/global'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faArrowLeft, faBell, faCommentAlt, faUserFriends, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';

import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, DoCheck {

  public identity;
  public token;
  public acceder;
  public loading: boolean;
  public url: string;
  public countNotification: number;
  public countFriendRequest: number;
  public arrayNotifications;
  public arrayFriendsRequest;

  public activesChats: Array<object>;

  faArrowLeft = faArrowLeft;
  faBell = faBell;
  faCommentAlt = faCommentAlt;
  faUserFriends = faUserFriends;
  faHome = faHome
  faShoppingBag = faShoppingBag

  public showNotifications = false;
  public showMessages = false;
  public showFriendsRequest = false;
  public showMenuProfile = false;

  public userFilter;
  public users: any[] = [];


  constructor(
    private _authService: AuthService,
    private _userServie: UserService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _messageService: MessageService,
    private snotifyService: SnotifyService
  ) {
    this.url = GLOBAL.url
    this.loading = false;
    this.countNotification = 0;
    this.countFriendRequest = 0;
    this.userFilter = { username: '', first_name: '', last_name: '', image_profile: '', gender: '' }
  }

  ngOnInit() {
    this.identity = this._userServie.getIdentity()
    this.token = this._userServie.getToken()
    this.loading = false;
    this.activesChats = []

    if (this.identity && this.token) {
      this.getUsers()
      this.getFriendRequest()
      this.getNotifications()

      this._messageService.message.subscribe(data => {
        const friend = data.from
        if (this.identity.username !== friend.username) {
          this.addChat({ username: friend.username, first_name: friend.first_name, last_name: friend.last_name })
        }
      })

      this._userServie.countNotificationApi().subscribe((resp: any) => {
        if (resp.code === 'GL99') {
          this.countNotification = resp.message
        }
      }, error => {
        this.snotifyService.error(error.error.message);
      })
      this._userServie.countFriendsRequestApi().subscribe((resp: any) => {
        if (resp.code === 'GL99') {
          this.countFriendRequest = resp.message
        }
      }, error => {
        this.snotifyService.error(error.error.message);
      })

      this._authService.userLoggedInWS(this.identity.username)
      this._userServie.countNotification.subscribe(data => {
        this.countNotification = data.count
        this.getFriendRequest()
      })

      this._userServie.countFriendRequest.subscribe(data => {
        this.countFriendRequest = data.count
        this.getFriendRequest()
      })
    }

    console.log('main.component cargado')
  }

  ngDoCheck() {
    this.identity = this._userServie.getIdentity()
    this.token = this._userServie.getToken()
  }

  getUsers() {
    this._userServie.getUsers(this.token).subscribe((resp: any) => {
      this.users = resp.message
    })
  }

  closeChat(friend) {
    let userExists = this.activesChats.find((chat: any, index: number) => {
      if (chat.username === friend.username) {
        this.activesChats.splice(index, 1)
      }
      return chat.username === friend.username
    })
  }

  addChat(friend) {
    let userExists = this.activesChats.find((chat: any, index: number) => {
      return chat.username === friend.username
    })

    if (!userExists) {
      this.activesChats.push(friend)
    }
  }

  getNotifications() {
    this._userServie.showNotification().subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.arrayNotifications = resp.message
      }
    }, error => {
      this.snotifyService.error(error.error.message);
    })
  }

  getFriendRequest() {
    this._userServie.showFriendsorRequest(this.identity.username, 'requests').subscribe(resp => {
      this.arrayFriendsRequest = resp.message
    }, error => {
      this.snotifyService.error(error.error.message);
    })
  }

  readNotification() {
    this._userServie.readNotificacion().subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.countNotification = 0
      }
    }, error => {
      this.snotifyService.error(error.error.message);
    })
  }

  logout() {
    localStorage.clear()
    this._authService.userLoggedOutWS(this.identity.username)
    this.showNotifications = false;
    this.showMessages = false;
    this.showFriendsRequest = false;
    this.showMenuProfile = false;
    this.identity = null
    this.token = null
    this._router.navigate(['/'])
  }

}
