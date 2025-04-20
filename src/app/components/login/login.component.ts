import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage:string = '';

  constructor(private fb: FormBuilder,
              private route : Router,
              private authService : UserAuthenticationService
  ) {
    this.loginForm = this.fb.group({
      UserId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.authService.userLogin(this.loginForm.value).subscribe({
        next:(response:any)=>{
          if(response.token === 1 && response.statusCode === '200'){
            this.route.navigate(['Home']);
          }else if(response.token === 0 && response.statusCode === '200'){
            this.errorMessage = 'Invalid Username or password'
            console.log(this.errorMessage);
          }else{
            this.errorMessage = 'Some technical error has occurred'
          }
        },
        error:(error)=>{
          console.error('error',error);
          this.errorMessage = 'Some technical error has occurred'
        }
      })

    }
  }

  userRegistration(){
    this.route.navigate(['/Registration']);
  }
}
