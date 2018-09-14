import { Component, OnInit} from '@angular/core';
import { SessionService } from '../../Services/session.service';
import { BackendService } from '../../Services/backend.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  user
  crops;
  constructor(private session: SessionService, private backend: BackendService) {
    this.user = session.getSession();
   }
   ngOnInit(){

   }

}
