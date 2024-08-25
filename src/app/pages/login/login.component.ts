import { Component, ViewChild} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UserModel } from './user-model.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   @ViewChild('signupForm') signupForm!: NgForm;
   reactiveForm!: FormGroup;
   submitted: boolean = false;
  isSignDivVisiable: boolean  = true;

  signUpObj: UserModel  = new UserModel();
  loginObj: LoginModel  = new LoginModel();
  constructor(private router: Router,private http:HttpClient,private formBuilder:FormBuilder,private appService:AppService){
    this.reactiveForm=this.formBuilder.group({
      name: [null, Validators.required]});
    }


  onRegister() {
     this.http.post("http://localhost:8080/api/users/create", this.signUpObj).subscribe((resultData:any)=>
     {
       alert("Registered Successfully");
       this.reactiveForm.reset();
       this.signUpObj = new UserModel();
       });
  }

 onLogin() {
   this.http.post("http://localhost:8080/api/users/login", {
     email: this.loginObj.email,
     password: this.loginObj.password
   }).subscribe((resultData: any) => {
     if (resultData) {
       this.appService.setUserDetail(resultData);
       alert("Login Successful");
            this.router.navigateByUrl('/dashboard');
       }
   }, error => {
     alert("Login Failed. Please check your credentials.");
   });
 }

}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;
  role:string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= "";
    this.role="";

  }
}

export class LoginModel  {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password= ""
  }
}
