import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import {SnotifyService} from 'ng-snotify';

import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import { UserService  } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

import { GLOBAL } from '../../services/global'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit  {
  public url;
  public title: string;
  public user: User;
  public status: string;
  public loading: boolean;
  faCameraRetro = faCameraRetro;
  registerForm: FormGroup;
  submitted = false;
  existImageProfile: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UserService,
    private _uploadService: UploadService,
    private formBuilder: FormBuilder,
    private snotifyService: SnotifyService
    ) {
    this.title = 'Signin';
    this.url = GLOBAL.url
    this.user = new User(null, '', '', '', '', '', '', '');
    this.existImageProfile = false;
    this.loading = true
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loading = false;
  }

  @ViewChild('imgProfile') imgProfileElement: ElementRef;

  ngAfterViewInit() {
  }

  get f() { return this.registerForm.controls; }

  public filesToUpload: Array<File>

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files
  }

  getImage(imgProfile) {
    let file = imgProfile.files[0]
    if (file.type.indexOf('image') !== -1) {
      let reader = new FileReader()
      reader.onload = event => {
        this.imgProfileElement.nativeElement.src = event.target.result
      }
      reader.readAsDataURL(file)
      this.existImageProfile = true;
    } else {
      console.log('ingrese solo imagenes')
    }
  }

  onSubmit(form) {
    this.loading = true
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.loading = false
      return;
    }

    this.user.username = this.registerForm.value.username
    this.user.first_name = this.registerForm.value.first_name
    this.user.last_name = this.registerForm.value.last_name
    this.user.email = this.registerForm.value.email
    this.user.password = this.registerForm.value.password
    this.user.gender = this.registerForm.value.gender

    this._userService.register(this.user).subscribe(response => {
      if (response.code === 'GL99') {
        this._uploadService.makeFileRequest(`${this.url}/user/upload-image-profile/${this.user.username}`, '', this.filesToUpload, '', 'image')
        form.reset();
        this._router.navigate(['/auth/verify-email'], { queryParams: { email: this.user.email } })
      } else {
        this.snotifyService.error(response.message);
      }
      this.loading = false
    }, error => {
      this.snotifyService.error(error.error.message);
    })
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
