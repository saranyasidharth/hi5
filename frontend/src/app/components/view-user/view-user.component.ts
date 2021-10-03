import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import io from 'socket.io-client';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  tabElement: any;
  postsTab = false;
  contactsTab = false;
  followersTab = false;
  posts = [];
  contacts = [];
  followers = [];
  user: any;
  name: any;
  postValue: any;
  editForm: FormGroup;
  modalElement: any;
  socket: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.postsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.tabElement = document.querySelector('.nav-content');

    this.modalElement = document.querySelector('.modal');
    M.Modal.init(this.modalElement, {});

    this.route.params.subscribe(params => {
      this.name = params.name;
      this.GetUserData(this.name);
    });

    this.socket.on('refreshPage', data => {
      this.route.params.subscribe(params => {
        this.name = params.name;
        this.GetUserData(this.name);
      });
    });

    this.InitEditForm();
  }

  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }

  InitEditForm() {
    this.editForm = this.fb.group({
      editedPost: ['', Validators.required]
    });
  }

  GetUserData(name) {
    this.usersService.GetUserByName(name).subscribe(
      data => {
        this.user = data.result;
        this.posts = data.result.posts.reverse();
        this.followers = data.result.followers;
        this.contacts = data.result.contacts;
      },
      err => console.log(err)
    );
  }

  OpenEditModal(post) {
    this.postValue = post;
  }

  SubmitEditedPost() {
    const body = {
      id: this.postValue.postId._id,
      post: this.editForm.value.editedPost
    };
    this.postService.EditPost(body).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
    M.Modal.getInstance(this.modalElement).close();
    this.editForm.reset();
  }

  CloseModal() {
    M.Modal.getInstance(this.modalElement).close();
    this.editForm.reset();
  }

  DeletePost() {
    this.postService.DeletePost(this.postValue.postId._id).subscribe(
      data => {
        this.socket.emit('refresh', {});
      },
      err => console.log(err)
    );
    M.Modal.getInstance(this.modalElement).close();
  }

  ChangeTab(value) {
    if (value === 'posts') {
      this.postsTab = true;
      this.followersTab = false;
      this.contactsTab = false;
    }

    if (value === 'contacts') {
      this.postsTab = false;
      this.followersTab = false;
      this.contactsTab = true;
    }

    if (value === 'followers') {
      this.postsTab = false;
      this.followersTab = true;
      this.contactsTab = false;
    }
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }
}
