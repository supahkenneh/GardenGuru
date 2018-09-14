import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../Services/session.service';
import { BackendService } from '../../Services/backend.service';
@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  user;
  messages;
  hasMessages: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService,
    private route: ActivatedRoute,
    private backend: BackendService
  ) {
    this.user = session.getSession();
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.backend
      .getMessages()
      .then(result => {
        this.messages = result;
        if (!this.messages.length) {
          this.hasMessages = false;
          console.log(this.hasMessages);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}
