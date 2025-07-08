import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddVisitorPayload } from 'src/app/Models/AddVisitorPayload';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.scss']
})
export class AddVisitorComponent implements OnInit{
  visitorForm! : FormGroup
  isFormSubmitted: boolean = false;
  departments :any[] = []
  Ids :any[] = []

  constructor(private fb : FormBuilder,
              private visitor : VisitorManagementService,
              private toastr: ToastrService,
              private router : Router,
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
        isInvited: true
      }

      await this.visitor.addVisitor(payload).subscribe({
        next:(response:any)=>{
          if(response.token === 1 && response.statusCode === '200'){
              console.log('Visitor Added');
              this.visitorForm.reset();
              this.isFormSubmitted = false;
              this.router.navigate(['ManageVisitor']);
              this.toastr.success('Visitor added successfully!');
          }
        },
        error:(error:any)=>{
          console.log('error',error);
          this.toastr.error('Visitor is  not added');

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
}
