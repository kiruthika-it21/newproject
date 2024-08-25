import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../login/user-model.model';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 currentUser:UserModel=new UserModel();
  loggedUser: any;
  constructor(private router: Router,private appService:AppService) {
//     const localUser = localStorage.getItem('loggedUser');
//     if(localUser != null) {
//       this.loggedUser = JSON.parse(localUser);
//     }

this.currentUser=this.appService.getUserDetail();
   console.log(this.currentUser);
  }

  onLogoff() {
    this.appService.setUserDetail(new UserModel());
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login')
  }
}
