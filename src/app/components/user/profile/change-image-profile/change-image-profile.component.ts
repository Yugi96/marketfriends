import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './../../../../services/user.service'
import { GLOBAL } from './../../../../services/global'
import { Router, ActivatedRoute } from '@angular/router'
import { faCamera, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-change-image-profile',
  templateUrl: './change-image-profile.component.html',
  styleUrls: ['./change-image-profile.component.css']
})
export class ChangeImageProfileComponent implements OnInit {
  @Output() public closeModal = new EventEmitter()

  @ViewChild('imgProfile') imgProfileElement: ElementRef;

  public token;
  public identity;
  public url;

  public arrayPhotos;

  faCamera = faCamera
  faTimes = faTimes
  faCheck = faCheck

  public selectImage;

  public imageUpdate;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _uploadService: UploadService
  ) {
    this.url = GLOBAL.url
    this.selectImage = ''
    this.imageUpdate = ''

    this.identity = _userService.getIdentity()
    this.token = _userService.getToken()

    this._userService.getPhotosUser(this.identity.username).subscribe((resp: any) => {
      if (resp.code === 'GL99') {
        this.arrayPhotos = resp.message
      }
    })
  }

  public filesToUpload: Array<any> = []

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

  changeImageProfile() {
    if (this.filesToUpload.length !== 0) {
      this._uploadService.makeFileRequest(`${this.url}/user/change-image-profile`, '', this.filesToUpload, this.token, 'image')
      .then((resp:any) => {
        if (resp.code === 'GL99') {
          this.filesToUpload = []
          this.imageUpdate = resp.message
          this.close()
        } else {
          console.log(resp.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
    } else if (this.selectImage){
      this._userService.changeImageProfile(this.selectImage, this.token).subscribe((resp: any) => {
          if (resp.code === 'GL99') {
            this.imageUpdate = resp.message
            this.close()
          } else {
            console.log(resp.message)
          }
      })
    }
  }

  close() {
    if (this.imageUpdate === '') {
      this.closeModal.emit({ action: false, filename: this.identity.image_profile })
    } else {
      this.closeModal.emit({ action: false, filename: this.imageUpdate })
    }
    this.selectImage = ''
    this.filesToUpload = []
  }

  ngOnInit() {
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
