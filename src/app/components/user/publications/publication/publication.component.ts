import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { faThumbsUp, faHeart, faAngry, faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  @Input() public publication;
  @Output() public submitOk = new EventEmitter();


  public identity;
  public token;
  public url: string;

  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots
  faTimes = faTimes

  public statusLiked;

  public countReactions;

  constructor(
    private _userService: UserService,
    public _publicationService: PublicationService
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.iLiked(this.publication.reactions)
    this.countReactions = this.publication.reactions.length
    this._publicationService.countReactions.subscribe(data => {
      if (this.publication.filename) {
        if (data.id === this.publication.id && data.type === 'image') {
          this.countReactions = data.count
        }
      } else {
        if (data.id === this.publication.id && data.type === 'publication') {
          this.countReactions = data.count
        }
      }
    })
  }

  auto_grow(element, minHeight, border) {
    if (element.value === '') element.style.height = `${minHeight}px`
    if (border) if (element.style.height > 100) element.style.borderRadius = `${border}px`
    element.style.height = (element.scrollHeight)+"px";
  }

  like(publicationId, publicationType) {
    this._publicationService.like(publicationId, publicationType, this.token).subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.statusLiked = !this.statusLiked
        this._publicationService.countReactionsEmitWS(publicationId, publicationType)
      }
    })
  }

  iLiked(reactions: Array<any>) {
    this.statusLiked = reactions.some(reaction => reaction.user.username === this.identity.username)
  }

  delete(id, type) {
    this._publicationService.deletePublication(id, type, this.token).subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.submitOk.emit(true)
      }
    })

  }

}
