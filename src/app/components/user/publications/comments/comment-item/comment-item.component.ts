import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../../../../../services/user.service'
import { GLOBAL } from './../../../../../services/global'
import { faThumbsUp, faHeart, faAngry, faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() public commentItem;

  public identity;
  public token;
  public url: string;

  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots

  constructor(
    private _userService: UserService
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }

}
