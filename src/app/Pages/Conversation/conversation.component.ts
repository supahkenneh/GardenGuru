import { Component, OnInit } from '@angular/core';
import { AuthServiceReg} from '../../Services/auth.service';
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
    private auth: AuthServiceReg,
    private router: Router,
    private backend: BackendService,
    private route: ActivatedRoute,
    private session: SessionService
  ) {
    this.user = this.session.getSession()
  }

  sendMessage(){
    if(this.message.content){
    this.backend.sendMessage(this.message, this.conversationId )
    .then(result=>{
      this.messages.push(result)
      this.ngOnInit()
      this.message.content = '';
      
    })
  }else {
    console.log('no input given')
  }
  }
  scrollToBottom() {
    const elmnt = document.getElementById('message-container')
    elmnt.scrollIntoView(false); // Bottom
  }

  ngOnInit() {
    this.scrollToBottom()
    this.conversationId = this.route.snapshot.paramMap.get('id');
    if(this.conversationId === this.user.id){
      this.userIsUser = true
    }
    
    this.backend.getConversation(this.conversationId)
    .then(result=>{
      this.messages = result;
    })
  }
}
