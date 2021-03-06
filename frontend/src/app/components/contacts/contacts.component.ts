import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts = [];
  user: any;

  socket: any;

  constructor(private tokenService: TokenService, private usersService: UsersService) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', () => {
      this.GetUser();
    });
  }

  GetUser() {
    this.usersService.GetUserById(this.user._id).subscribe(
      data => {
        this.contacts = data.result.contacts;
      },
      err => console.log(err)
    );
  }

  UnFollowUser(user) {
    this.usersService.UnFollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }
}
