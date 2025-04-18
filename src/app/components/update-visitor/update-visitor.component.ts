import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { UtilityService } from 'src/Utilities/utility.service';

@Component({
  selector: 'app-update-visitor',
  templateUrl: './update-visitor.component.html',
  styleUrls: ['./update-visitor.component.scss']
})
export class UpdateVisitorComponent implements OnInit {
  visitorId:string | null = null;
  visitForm! : FormGroup
  isFormSubmitted: boolean = false;
  visitorsList: any[] = []
  columns: any[] = []

  constructor(private route: ActivatedRoute,
              private fb : FormBuilder,
              private visitor : VisitorManagementService,
              private utilities : UtilityService,
              private toastr: ToastrService
              
  ) {
    this.visitForm = this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      emailId:['',[Validators.required,Validators.email]],
      contactNumber:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      address:['',Validators.required],
      whomToMeet:['',Validators.required],
      department:['',Validators.required],
      reasonToMeet:['',Validators.required],
      visitDate:['',Validators.required],
      inTime:['',Validators.required],
      exitTime:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.visitorId = this.route.snapshot.paramMap.get('id');
    console.log('visitorId',this.visitorId)
    Object.keys(this.visitForm.controls).forEach(controlName =>{
      if(controlName === 'exitTime'){
        const exitTimeValue = this.visitForm.get('exitTime')?.value;
        if(!exitTimeValue) this.visitForm.get('exitTime')?.enable();
        else this.visitForm.get('exitTime')?.disable();
      }else{
        this.visitForm.get(controlName)?.disable();
      }
    })
    this.getAllVisitors();
  }

  get f() {
    return this.visitForm.controls;
  }

  getAllVisitors(){
    const payload = {
      "visitorId": this.visitorId
    }
    this.visitor.getVisitorById(payload).subscribe({
      next:(response:any)=>{
        if(response.token === 1 && response.statusCode === '200'){
            this.visitorsList = response.data;
            
            this.visitForm.patchValue(this.visitorsList);
            console.log(this.visitorsList)
        }
      },
      error:(error:any)=>{
        console.log('error',error);
      }
    });
  }
  
  onSubmit(){
    this.isFormSubmitted = true;
    if(this.visitForm.valid){
      const payload = {
          "visitorId": this.visitorId,
          "exitTime": this.visitForm.get('exitTime')?.value
      }
      this.visitor.updateVisitor(payload).subscribe({
        next:(response:any)=>{
          if(response.token === 1 && response.statusCode === '200'){
            this.toastr.success('Visitor updated successfully!');
            this.visitForm.get('exitTime')?.disable();
          }else{
            this.toastr.warning('Some technical issue while updating visitor');
          }
        },
        error:(error:any)=>{
          this.toastr.error('Error while updating visitor');
        }
      })
    }else{
      console.log('Form is invalid');
    }
  }

  printPage() {
    const printContent = document.getElementById('print-section');
    console.log(printContent)
    const originalContent  = document.body.innerHTML;
    // const form = document.getElementById("visitForm");

    document.body.innerHTML = printContent?.innerHTML || '';
    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload();
  }

}
