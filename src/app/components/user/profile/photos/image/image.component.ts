import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../../../../services/user.service'
import { GLOBAL } from './../../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() public photo
  @Output() public selectImage = new EventEmitter();

  public token;
  public identity;
  public url;
  faPlusCircle = faPlusCircle
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
  }

  select(filename) {
    this.selectImage.emit(filename)
  }

}
