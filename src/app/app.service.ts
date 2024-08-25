import {Injectable} from '@angular/core';
import {UserModel} from './pages/login/user-model.model';
@Injectable({
  providedIn: 'root'
})
export class AppService{

    private userDetail: UserModel;


    constructor() {
        this.userDetail = new UserModel(); // Initialize userDetail in the constructor
      }

    setUserDetail(user:UserModel){
      //this.userDetail=new UserModel();
      this.userDetail=user;

      }
    getUserDetail(){
          return this.userDetail;
          }
  }
