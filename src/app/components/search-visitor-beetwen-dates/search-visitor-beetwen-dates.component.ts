import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { UtilityService } from 'src/Utilities/utility.service';

@Component({
  selector: 'app-search-visitor-beetwen-dates',
  templateUrl: './search-visitor-beetwen-dates.component.html',
  styleUrls: ['./search-visitor-beetwen-dates.component.scss']
})
export class SearchVisitorBeetwenDatesComponent {
  searchForm! : FormGroup
  isFormSubmitted: boolean = false;
  fromDate:string = '';
  toDate : string = '';
  visitorsList: any[] = []
  columns: any[] = []
  
    constructor(private fb : FormBuilder,
                    private visitor : VisitorManagementService,
                    private utilities : UtilityService
      
    ) {
      this.searchForm = this.fb.group({
        fromDate:['',Validators.required],
        toDate:['',Validators.required],
      })
    }
  
    get f(){
      return this.searchForm.controls;
    }
  
    onSubmit(){
      this.isFormSubmitted = true;
      if(this.searchForm.valid){
        this.fromDate = this.searchForm.get('fromDate')?.value
        this.toDate = this.searchForm.get('toDate')?.value
        this.getAllVisitors();
        console.log('Form Submitted:',this.searchForm.value);
      }else{
        console.log('Form is invalid');
      }
    }

    getAllVisitors(){
      const payload = {
        "searchString": "",
        "fromDate": this.fromDate,
        "toDate": this.toDate
      }
      this.visitor.getAllVisitors(payload).subscribe({
        next:(response:any)=>{
          this.visitorsList = response.data;
          if(response.token === 1 && response.statusCode === '200'){
              this.visitorsList = response.data;
              this.columns = Object.keys(response.data[0]);
              const excludeColumns = ['address', 'whomToMeet', 'reasonToMeet', 'department'];
              this.columns = this.columns.filter(col => !excludeColumns.includes(col));
              this.columns = this.columns.filter(key => key !== 'visitorId')
                                         .map(key =>this.utilities.convertKeyToLabel(key));
              this.columns.push('Action');
              this.visitorsList = this.visitorsList.map(visitor =>{
                const updatedVisitor: any = {};
                Object.keys(visitor).forEach(key => {
                  updatedVisitor[this.utilities.convertKeyToLabel(key)] = visitor[key];
                });
                return updatedVisitor;
              })
          }
        },
        error:(error:any)=>{
          console.log('error',error);
        }
      });
    }
}
