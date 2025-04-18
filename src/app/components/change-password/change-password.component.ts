import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService  } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm! : FormGroup
    isFormSubmitted: boolean = false;
  
    constructor(private fb : FormBuilder,
                private toastr : ToastrService
    ) {
      this.changePasswordForm = this.fb.group({
        currentPassword:['',[Validators.required,Validators.minLength(6)]],
        newPassword:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['',[Validators.required,Validators.email]]
      });
    }
  
    get f() {
      return this.changePasswordForm.controls;
    }
  
    onSubmit(){
      this.isFormSubmitted = true;
      if(this.changePasswordForm.valid){
        // this.toastr.success('Password is changed');
        console.log('Form Submitted:',this.changePasswordForm.value);
      }else{
        console.log('Form is invalid');
      }
    }
}
