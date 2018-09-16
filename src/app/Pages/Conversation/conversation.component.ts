import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from '../../Services/backend.service';
import { SessionService } from '../../Services/session.service';



@Component({
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  conversationId;
  messages;
  user;
  userIsUser: boolean = false
  deleted:boolean = true;

  message:{
    content: string
  } = {
    content:''
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService
  ) {
    this.user = this.session.getSession()
  }

  sendMessage(){
    this.backend.sendMessage(this.message, this.conversationId )
    .then(result=>{
      this.messages.push(result)
      this.ngOnInit()
    })
  }

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('id');
    if(this.conversationId === this.user.id){
      this.userIsUser = true
    }
    
    this.backend.getConversation(this.conversationId)
    .then(result=>{
      this.messages = result;
      console.log(this.messages)
    })
  }
}
