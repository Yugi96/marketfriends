import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../services/user.service';
import { PublicationService } from './../../../../services/publication.service';
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faThumbsUp, faHeart, faAngry, faCommentDots } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public token;
  public identity;
  public url;

  public username;

  public isMorePublications;

  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots

  public loading;
  public userProfile;

  public arrayPublications: Array<any>;
  public page;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _publicationService: PublicationService
  ) {
    this.loading = true
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.page = 1;
    this.userProfile = '';
    this.isMorePublications = true;

    this.userProfile  = this.identity


    this.url = GLOBAL.url
    this._route.parent.params.subscribe(param => {
      this.username = param.username
      if(this.username) {
        this._userService.getProfile(this.username).subscribe(resp => {
          if (resp.code === 'GL99') {
            this.userProfile = resp.message
            this._publicationService.getPublicationsByUsername(this.page, this.token, this.userProfile.username).subscribe((resp: any) => {
              this.arrayPublications = resp.message
            })
          } else {
            console.log(resp.message)
          }
          this.loading = false
        }, err => {
          console.log(err)
        })
      } else {
        this._publicationService.getPublicationsAll(this.page, this.token).subscribe((resp: any) => {
          this.arrayPublications = resp.message
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

  refreshPublications(action) {
    if (this.username) {
      if (action) {
        this._publicationService.getPublicationsByUsername(this.page, this.token, this.userProfile.username).subscribe((resp: any) => {
          if (resp.message.length === 0) {
            this.isMorePublications = false;
          }
          this.arrayPublications = resp.message
        })
      }
    } else {
      this._publicationService.getPublicationsAll(this.page, this.token).subscribe((resp: any) => {
        if (resp.message.length === 0) {
          this.isMorePublications = false;
        }
        this.arrayPublications = resp.message
      })
    }
  }

  showMore() {
    this.page++
    if (this.username) {
      this._publicationService.getPublicationsByUsername(this.page, this.token, this.userProfile.username).subscribe((resp: any) => {
        this.arrayPublications = this.arrayPublications.concat(resp.message)
        if (resp.message.length === 0) {
          this.isMorePublications = false;
        }
      })
    } else {
      this._publicationService.getPublicationsAll(this.page, this.token).subscribe((resp: any) => {
        this.arrayPublications = this.arrayPublications.concat(resp.message)
        if (resp.message.length === 0) {
          this.isMorePublications = false;
        }
      })
    }
  }


}
