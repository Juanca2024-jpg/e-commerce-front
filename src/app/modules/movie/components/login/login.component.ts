import { Component } from '@angular/core';
import { login } from '@data/interfaces/login';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '@data/services/authentication.service';
import { TokenService } from '@data/services/token.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  invalidmail: string = "form-control";
  invalidpass: string = "form-control";
  Login:login;
  constructor(private authentication: AuthenticationService ,private routes: Router, private tokenService: TokenService) {
    this.Login = new login();
  }
  errorMessage: string = '';
  token: string = '';
  VerifyPass(event: any) {
    this.invalidpass = "form-control ";
  }

  VerifyMail(event: any) {
    this.invalidmail = "form-control ";
  }
  login() {
    if (this.Login.email == '') {
      this.invalidmail = this.invalidmail + " is-invalid";
    }
    if (this.Login.password == '') {
      this.invalidpass = this.invalidpass + " is-invalid";
    }
    if (this.Login.password != '' && this.Login.email != '') {
      this.authentication.getToken(this.Login).subscribe({
        next: (response)=>{
          this.tokenService.setToken(response.results);
          this.routes.navigate(['/ecommerce/home/list-products'])
        },
        error: (err)=>{
          console.log("Error fetching token: ", err);
        }
      })
    }

  }
  
}
