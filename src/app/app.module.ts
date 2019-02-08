import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MomentModule } from 'ngx-moment';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/user/publications/home/home.component';

import { appRoutingProviders, routing } from './app.routing';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserGuardService } from './services/middlewares/user.guard.service';
import { NoUserGuardService } from './services/middlewares/no-user.guard.service';
import { WebsocketService } from './services/websocket.service'
import { NotificationService } from './services/notification.service'
import { PublicationService } from './services/publication.service';
import { MessageService } from './services/message.service';

import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ConfirmationMessageComponent } from './components/confirmation-message/confirmation-message.component';
import { RestorePasswordChangeComponent } from './components/restore-password-change/restore-password-change.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { PublicationComponent } from './components/user/publications/publication/publication.component';
import { CommentsComponent } from './components/user/publications/comments/comments.component';
import { InformationComponent } from './components/user/profile/information/information.component';
import { FriendsComponent } from './components/user/profile/friends/friends.component';
import { PhotosComponent } from './components/user/profile/photos/photos.component';
import { CardFriendComponent } from './components/user/profile/friends/card-friend/card-friend.component';
import { ImageComponent } from './components/user/profile/photos/image/image.component';
import { ToPostComponent } from './components/user/publications/to-post/to-post.component';
import { NotificationComponent } from './components/user/fragments/notification/notification.component';
import { FriendRequestComponent } from './components/user/fragments/friend-request/friend-request.component';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { CommentItemComponent } from './components/user/publications/comments/comment-item/comment-item.component';
import { MessagesComponent } from './components/user/messages/messages.component';
import { UserFriendComponent } from './components/user/messages/user-friend/user-friend.component';
import { ChatComponent } from './components/user/messages/chat/chat.component';
import { MessageChatComponent } from './components/user/messages/chat/message-chat/message-chat.component';
import { ChangeImageProfileComponent } from './components/user/profile/change-image-profile/change-image-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VerifyEmailComponent,
    RestorePasswordComponent,
    ConfirmationMessageComponent,
    RestorePasswordChangeComponent,
    ProfileComponent,
    PublicationComponent,
    CommentsComponent,
    InformationComponent,
    FriendsComponent,
    PhotosComponent,
    CardFriendComponent,
    ImageComponent,
    ToPostComponent,
    NotificationComponent,
    FriendRequestComponent,
    MainComponent,
    AuthComponent,
    CommentItemComponent,
    MessagesComponent,
    UserFriendComponent,
    ChatComponent,
    MessageChatComponent,
    ChangeImageProfileComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FilterPipeModule,
    MomentModule,
    SnotifyModule
  ],
  providers: [
    UserService,
    AuthService,
    UserGuardService,
    NoUserGuardService,
    appRoutingProviders,
    WebsocketService,
    NotificationService,
    PublicationService,
    MessageService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
