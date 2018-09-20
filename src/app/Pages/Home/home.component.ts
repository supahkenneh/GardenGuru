import { Component, OnInit } from '@angular/core';
import { AuthServiceReg } from '../../Services/auth.service';
import { SessionService } from '../../Services/session.service';
import { Router } from '@angular/router';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthServiceReg, private router: Router, private session: SessionService) { }


}
