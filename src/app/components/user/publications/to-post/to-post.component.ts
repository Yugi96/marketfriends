import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { faThumbsUp, faHeart, faAngry, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-to-post',
  templateUrl: './to-post.component.html',
  styleUrls: ['./to-post.component.css']
})
export class ToPostComponent implements OnInit {
  @Output() public submitOk = new EventEmitter();

  @ViewChild('imgProfile') imgProfileElement: ElementRef;


  public identity;
  public token;
  public url: string;
  faThumbsUp = faThumbsUp
  faHeart = faHeart
  faAngry = faAngry
  faCommentDots = faCommentDots
  postPublicationForm: FormGroup;

  constructor(
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute,
    private snotifyService: SnotifyService
  ) {
    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()
    this.url = GLOBAL.url
  }

  ngOnInit() {
    this.postPublicationForm = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }


  get f() { return this.postPublicationForm.controls; }

  public filesToUpload: Array<File> = []

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

  onSubmit(form) {
    if (this.postPublicationForm.value.text || this.filesToUpload.length !== 0) {
      this._uploadService.makeFileRequest(`${this.url}/publication/create`, this.postPublicationForm.value.text, this.filesToUpload, this.token, 'image')
        .then((resp:any) => {
          if (resp.code === 'GL99') {
            this.postPublicationForm.reset()
            this.filesToUpload = []
            this.submitOk.emit(true)
          } else {
            this.snotifyService.error(resp.message);
          }
        })
        .catch(err => {
          this.snotifyService.error(err);
          console.log(err)
        })
    } else {
      this.snotifyService.error('Escriba un estado o publique una imagen.');
    }
  }

  auto_grow(element, minHeight, border) {
    if (element.value === '') element.style.height = `${minHeight}px`
    if (border) if (element.style.height > 100) element.style.borderRadius = `${border}px`
    element.style.height = (element.scrollHeight)+"px";
  }

  getImage(imgProfile) {
    let file = imgProfile.files[0]
    if (file.type.indexOf('image') !== -1) {
      let reader = new FileReader()
      reader.onload = event => {
        this.imgProfileElement.nativeElement.src = event.target.result
      }
      reader.readAsDataURL(file)
    } else {
      console.log('ingrese solo imagenes')
    }
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
