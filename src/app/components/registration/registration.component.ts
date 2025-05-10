import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserRegistration } from 'src/app/interfaces/UserRegistraton';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  signupForm: FormGroup;
  userRoles: string[] = ['Admin','Receptionist'];
  registrationPayload : UserRegistration[] = [];

  constructor(private fb: FormBuilder,
              private route : Router,
              private userAuthentication : UserAuthenticationService
  ) {
    this.signupForm = this.fb.group(
      {
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      userRole:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
      },
      {
        validators:this.passwordMatchValidators
      }
  );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const paylaod : UserRegistration = {
        firstName : this.signupForm.get('firstName')!.value,
        lastName : this.signupForm.get('lastName')!.value,
        emailId : this.signupForm.get('email')!.value,
        password : this.signupForm.get('password')!.value,
        userRole : this.signupForm.get('userRole')!.value
      }

      this.userAuthentication.userRegistration(paylaod).subscribe({
        next : (response: any) =>{
          if(response.token === 1){
            console.log('response',response);
            console.log('Form Submitted', this.signupForm.value);
            this.route.navigate(['/Login']);
            alert(response.message);
          }
        },
        error : error =>{
          console.log('error',error);
        }
      })

    }
  }

  markFormTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  

  passwordMatchValidators(control:AbstractControl){
    const password = control.get('password')?.value
    const confirmPassword = control.get('confirmPassword')?.value

    if (!password || !confirmPassword) return null;

    if(password != confirmPassword){
      control.get('confirmPassword')?.setErrors({mismatch:true});
      return { mismatch: true };
    }else{
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  }

  redirectTo(){
    this.route.navigate(['Login']);
  } 
}
