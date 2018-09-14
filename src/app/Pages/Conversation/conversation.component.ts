import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../Services/backend.service';
@Component({
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  conversationId;
  constructor(
    private auth: AuthService,
    private router: Router,
    private backend: BackendService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id');
    this.backend.getConversation(this.conversationId);
  }
}
