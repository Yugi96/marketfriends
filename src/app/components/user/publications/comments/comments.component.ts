import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { faThumbsUp, faHeart, faAngry, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() public publication;

  public identity;
  public token;
  public url: string;
  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots

  public newComment;

  public typePublication;

  public arrayComments;
  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url

  }

  ngOnInit() {
    this.typePublication = this.publication.filename ? 'image' : 'publication'

    this._publicationService.comment.subscribe((resp: any) => {
      if (this.publication.id === resp.message.commentable_id && this.typePublication === resp.message.commentable) {
        this.publication.comments.push(resp.message)
      }
    })

    this.arrayComments = this.publication.comments

  }

  auto_grow(element, minHeight, border) {
    if (element.value === '') element.style.height = `${minHeight}px`
    if (border) if (element.style.height > 100) element.style.borderRadius = `${border}px`
    element.style.height = (element.scrollHeight)+"px";
  }

  addComment(publicationId, publicationType, textarea) {
    this._publicationService.addComment(publicationId, publicationType, this.token, { comment: textarea.value }).subscribe((resp: any) => {
      textarea.value = ''
      this._publicationService.commentEmitWS(resp.message)
      console.log(resp)
    })
  }

  refreshComments(publicationId, typePublication) {

  }

}
