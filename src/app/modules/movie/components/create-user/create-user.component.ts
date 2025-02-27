import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { NgIf } from '@angular/common';
import { createUser } from '@data/interfaces/create-user';
import { AuthenticationService } from '@data/services/authentication.service';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  // visualisar los warnings
  warningName = true;
  warningMail = true;
  warningPassword = true;
  isLoading?:boolean;
  // validaciones en los campos de los inputs
  validateName:String="form-control";
  validateMail:String="form-control";
  validatePassword:String="form-control";
  ValidateN(event:any){
    console.log("t")
    this.validateName="form-control";
    this.warningName = true;
  }
  ValidateM(event:any){
    this.validateMail="form-control";
    this.warningMail = true;
  }
  ValidateP(event:any){
    this.validatePassword="form-control";
    this.warningPassword=true;
  }
  cloudinary?:any;
  account:createUser;
  constructor(private auth:AuthenticationService){
    this.account = new createUser();
  }
  SingUp(event:any){
      if(this.account.name == ""){
        this.validateName = this.validateName+" is-invalid"
        this.warningName = false;
      }
      if(this.account.email == ""){
        this.validateMail = this.validateMail+" is-invalid"
        this.warningMail = false;
      }
      if(this.account.password == ""){
        this.validatePassword = this.validatePassword+" is-invalid"
        this.warningPassword = false;
      }
      if(this.account.name != ""&&this.account.nickname != ""&&this.account.email != ""&&this.account.password != ""&&this.account.city != ""){
        this.auth.createUser(this.account).subscribe({
          next: (response)=>{
            console.log(response.results)
          },
          error: (err)=>{
            console.log("cant't register the user", err);
          }
        });
      }
  }
}
