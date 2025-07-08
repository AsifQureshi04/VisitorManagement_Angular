import { Component } from '@angular/core';
import { DialogContentComponent } from '../SharedComponents/DialogContentComponent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddVisitorPayload } from 'src/app/Models/AddVisitorPayload';
import { NotifyVisitorService } from 'src/app/services/notify-visitor.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-visitor-request',
  templateUrl: './visitor-request.component.html',
  styleUrls: ['./visitor-request.component.scss']
})
export class VisitorRequestComponent {
  email: any;
  visitorPass:any;
  showVisitorForm = false;
  visitorForm: FormGroup;
  isFormSubmitted: boolean = false;
  departments: any;
  Ids: any;
  visitorData :any = {
    firstName:"",
    lastName :"",
    email:"",
    address:""
  };

  constructor(private fb : FormBuilder,
                private visitor : VisitorManagementService,
                private toastr: ToastrService,
                private router : Router,
                private dialog: MatDialog,
                private notifyVisitor : NotifyVisitorService
                
    ) {
      this.visitorForm = this.fb.group({
        firstName:['',[Validators.required,Validators.minLength(2)]],
        lastName:['',[Validators.required,Validators.minLength(2)]],
        email:['',[Validators.required,Validators.email]],
        phoneNumber:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/),Validators.maxLength(10)]],
        address:['',Validators.required],
        whomToMeet:['',Validators.required],
        department:['',Validators.required],
        reasonToMeet:['',Validators.required],
        VisitorId:['',Validators.required],
        IdNumber:['',Validators.required],
        date:['',Validators.required],
        inTime:['',Validators.required]
      });
    }

  notifyOfficial() {
    const payload = { 
      "visitorPass": this.visitorPass,
      "visitorEmail": this.email
    };
    console.log(payload);
    this.notifyVisitor.checkIfVisitorExists(payload).subscribe({
      next:(response)=> {
        if(response.token === 1 && response.statusCode === '200'){
           this.openDialog('Visiting official is notified through email');
           this.email = '';
           this.visitorPass = '';
        }else if(response.token === 0){
          this.showVisitorForm = true;
          this.openDialog('You have not raised any visiting request. Raise a request before visiting');
        }
      },
      error:(error)=> {
        
      },
    })

  }

  cancel(){
    this.showVisitorForm = !this.showVisitorForm
  }

  ngOnInit(){
      this.getDepartments();
      this.getIdProofs();
    }
  
    get f() {
      return this.visitorForm.controls;
    }
  
    async onSubmit(){
      this.isFormSubmitted = true;
      if(this.visitorForm.valid){
        console.log(this.visitorForm.value)
        const payload : AddVisitorPayload = {
          firstName : this.visitorForm.get('firstName')?.value,
          lastName: this.visitorForm.get('lastName')?.value,
          email: this.visitorForm.get('email')?.value,
          phoneNumber:this.visitorForm.get('phoneNumber')?.value,
          address: this.visitorForm.get('address')?.value,
          whomToMeet:this.visitorForm.get('whomToMeet')?.value,
          department:this.visitorForm.get('department')?.value,
          idProof: this.visitorForm.get('VisitorId')?.value,
          idProofNumber:this.visitorForm.get('IdNumber')?.value,
          reasonToMeet:this.visitorForm.get('reasonToMeet')?.value,
          visitDate:this.visitorForm.get('date')?.value,
          inTime: this.visitorForm.get('inTime')?.value,
          isInvited: false
        }
  
        await this.visitor.addVisitor(payload).subscribe({
          next:(response:any)=>{
            if(response.token === 1 && response.statusCode === '200'){
                console.log('Visitor Added');
                this.visitorForm.reset();
                this.isFormSubmitted = false;
                this.showVisitorForm = !this.showVisitorForm
                this.openDialog("Request raised!")
            }
          },
          error:(error:any)=>{
            console.log('error',error);
          }
        });
      }else{
        console.log('Form is invalid');
        this.toastr.error('All required fields are not given');  
      }
    }
  
    getDepartments(){
      this.visitor.getDepartmentList().subscribe({
        next:(response)=>{
          if(response.token === 1 && response.statusCode === '200'){
              this.departments = response.data;
              console.log(this.departments)
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  
    getIdProofs(){
      this.visitor.getIdProodfList().subscribe({
        next:(response)=>{
          if(response.token === 1 && response.statusCode === '200'){
              this.Ids = response.data;
              console.log(this.Ids)
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }


  openDialog(message: string) {
    this.dialog.open(DialogContentComponent, {
      data: { message }
    });
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }

  onPhoneNumberChange(){
    const contactNo = this.visitorForm.get('phoneNumber')?.value
    if(contactNo && contactNo.length === 10){
      this.getVisitorDetailsContactNo(contactNo);
    }
  }

  getVisitorDetailsContactNo(contactNo:string){
    const payload = 
      {
        "contactNo": contactNo
      }
    this.visitor.getVisitorDetailsContactNo(payload).subscribe({
      next :(response:any)=>{
        if(response?.token === 1 && response.statusCode === '200'){
          this.visitorData = response.data
          console.log(this.visitorData);
          this.visitorForm.get('firstName')?.setValue(this.visitorData.firstName);
          this.visitorForm.get('lastName')?.setValue(this.visitorData.lastName);
          this.visitorForm.get('email')?.setValue(this.visitorData.email);
          this.visitorForm.get('address')?.setValue(this.visitorData.address);
          this.visitorForm.get('VisitorId')?.setValue(this.visitorData.idTpye);
          this.visitorForm.get('IdNumber')?.setValue(this.visitorData.idNumber);
        }
      },
      error:(error:any)=>{

      }
    }) 
  }
}
