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
  visitorDetails : any
  columns: any[] = []

  constructor(private route: ActivatedRoute,
              private fb : FormBuilder,
              private visitor : VisitorManagementService,
              private utilities : UtilityService,
              private toastr: ToastrService
              
  ) {
    this.visitForm = this.fb.group({
      firstName:[{ value: '', disabled: true },[Validators.required,Validators.minLength(2)]],
      lastName:[{ value: '', disabled: true },[Validators.required,Validators.minLength(2)]],
      emailId:[{ value: '', disabled: true },[Validators.required,Validators.email]],
      contactNumber:[{ value: '', disabled: true },[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      address:[{ value: '', disabled: true },Validators.required],
      whomToMeet:[{ value: '', disabled: true },Validators.required],
      department:[{ value: '', disabled: true },Validators.required],
      reasonToMeet:[{ value: '', disabled: true },Validators.required],
      visitDate:[{ value: '', disabled: true },Validators.required],
      inTime:[{ value: '', disabled: true },Validators.required],
      exitTime:[{ value: '', disabled: true },Validators.required]
    });
  }

  ngOnInit(): void {
    this.visitorId = this.route.snapshot.paramMap.get('id');
    console.log('visitorId',this.visitorId)
    // Object.keys(this.visitForm.controls).forEach(controlName =>{
    //   if(controlName === 'exitTime'){
    //     const exitTimeValue = this.visitForm.get('exitTime')?.value;
    //     if(!exitTimeValue) this.visitForm.get('exitTime')?.enable();
    //     else this.visitForm.get('exitTime')?.disable();
    //   }else{
    //     this.visitForm.get(controlName)?.disable();
    //   }
    // })
    this.getVisitorById();
  }

  get f() {
    return this.visitForm.controls;
  }

  getVisitorById(){
    const payload = {
      "visitorId": this.visitorId
    }
    this.visitor.getVisitorById(payload).subscribe({
      next:(response:any)=>{
        if(response.token === 1 && response.statusCode === '200'){
            const [dd, mm, yy] = response.data.visitDate.split('-');
            const formattedDate = `20${yy}-${mm}-${dd}`;
            response.data.visitDate = formattedDate;
            this.visitorDetails = response.data;
            console.log(this.visitorDetails)
            this.visitForm.patchValue(this.visitorDetails);
            if(this.visitForm.get('exitTime')?.value.length === 0)
                this.visitForm.get('exitTime')?.enable()
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
    Object.keys(this.visitForm.controls).forEach(control =>{
      this.visitForm.get(control)?.enable();
    })

    setTimeout(()=>{
      const printContent = document.getElementById('print-section');
    console.log(printContent)
    const originalContent  = document.body.innerHTML;
    // const form = document.getElementById("visitForm");

    document.body.innerHTML = printContent?.innerHTML || '';
    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload();
    },1000);
  }

  printVisitorDocument() {
    const printContents = document.getElementById('printSection')?.innerHTML;
    const originalContents = document.body.innerHTML;
    
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  }
  

}
