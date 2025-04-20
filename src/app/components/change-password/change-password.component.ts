import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { ChangePasswordPayload } from 'src/app/Models/changePasswordPayload';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm! : FormGroup
  isFormSubmitted: boolean = false;
  changePasswordPayload! : ChangePasswordPayload;
  userId : string = '';
  
    constructor(private fb : FormBuilder,
                private toastr : ToastrService,
                private authService : UserAuthenticationService,
                private router : Router
    ) {
      this.changePasswordForm = this.fb.group({
        currentPassword:['',[Validators.required,Validators.minLength(6)]],
        newPassword:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',[Validators.required,this.matchValue('newPassword')]]
      });
    }

    matchValue(matchTo : string) : ValidatorFn{
      return (control:AbstractControl) =>{
        return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching : true}
      }
    }
  
    get f() {
      return this.changePasswordForm.controls;
    }
  
    onSubmit(){
      this.isFormSubmitted = true;
      if(this.changePasswordForm.valid){
        const userString = localStorage.getItem('user');
        const userJson = JSON.parse(userString!);
        this.userId = userJson.data.id
        console.log(this.userId)
        this.changePasswordPayload = {
          userId: this.userId,
          newPassword: this.changePasswordForm.get('newPassword')?.value,
          currentPassword: this.changePasswordForm.get('currentPassword')?.value
        };
        console.log('Form Submitted:',this.changePasswordPayload);
        this.authService.changePassword(this.changePasswordPayload).subscribe({
          next:(response:any)=>{
            if(response.token === 1 && response.statusCode === '200'){
                this.authService.logOut();
                this.toastr.success('Password Changed successfully, Login again');
            }else{
              this.toastr.error('incorrect user id or password');
            }
          },
          error:(error:any)=>{
            this.toastr.error('Some technical error has occurred');
          }
        })
      }else{
        this.toastr.error('Form is invalid');
        console.log('Form is invalid');
      }
    }
}
