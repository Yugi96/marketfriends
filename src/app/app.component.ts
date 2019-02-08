import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faArrowLeft, faBell, faCommentAlt, faUserFriends, faHome } from '@fortawesome/free-solid-svg-icons';

import { timer, of, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  public title = 'red-social-marketplace';

  constructor() {

  }

  ngOnInit() {
    console.log('app.component cargado')
  }

}
