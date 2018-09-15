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
  conversations;
  searchTerm;
  filtered:any
  deleted: boolean = false;
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
    this.getConversations();
  }

  // get user conversations
  getConversations() {
    return this.backend
      .getConversations()
      .then(result => {
        this.conversations = result;
        // console.log('this.convo', this.conversations);
        return this.conversations;
      })
      .then(result => {
        let cache = [];
        let filteredResult = []
        for (let i = 0; i < result.length; i++) {
          if (!cache.includes(result[i].from.id)) {
            cache.push(result[i].from.id)
            filteredResult.push(result[i])
          }
        }
        this.filtered = filteredResult
      });
  }

  deleteThread(){
    this.deleted = true
  }

  getMessages() {
    this.backend
      .getMessages()
      .then(result => {
        this.messages = result;
        if (!this.messages.length) {
          this.hasMessages = false;
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  }
}
