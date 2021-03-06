import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './components/auth-tabs/auth.module#AuthModule'
  },
  // {
  //   path: 'streams',
  //   loadChildren: './components/streams/streams.module#StreamsModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'notifications',
  //   loadChildren: './components/notifications/notifications.module#NotificationsModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'chats',
    loadChildren: './components/chats/chats.module#ChatsModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'chats/following',
  //   loadChildren: './components/following/following.module#FollowingModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'chats/contacts',
    loadChildren: './components/contacts/contacts.module#ContactsModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'post/:id',
  //   loadChildren: './components/comments/comments.module#CommentsModule',
  //   canActivate: [AuthGuard]
  // },
  {
      path: ':name',
      loadChildren: './components/view-user/view-user.module#ViewUserModule',
      canActivate: [AuthGuard]
  },
  {
      path: 'images/:name',
      loadChildren: './components/images/images.module#ImagesModule',
      canActivate: [AuthGuard]
  },
  {
      path: 'account/password',
      loadChildren: './components/change-password/change-password.module#ChangePasswordModule',
      canActivate: [AuthGuard]
  },
  {
    path: 'chat/:name',
    loadChildren: './components/chat/chat.module#ChatModule',
    canActivate: [AuthGuard]
},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
