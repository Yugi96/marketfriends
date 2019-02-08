import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faThumbsUp, faHeart, faAngry, faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  public token;
  public identity;
  public url;
  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots
  public loading;
  public userProfile;
  public arrayPhotos;

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
            this._userService.getPhotosUser(this.userProfile.username).subscribe((resp: any) => {
              if (resp.code === 'GL99') {
                this.arrayPhotos = resp.message
              }
            })
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

  auto_grow(element, minHeight, border) {
    if (element.value === '') element.style.height = `${minHeight}px`
    if (border) if (element.style.height > 100) element.style.borderRadius = `${border}px`
    element.style.height = (element.scrollHeight)+"px";
  }

}
