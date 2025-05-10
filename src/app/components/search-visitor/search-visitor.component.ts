import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { UtilityService } from 'src/Utilities/utility.service';

@Component({
  selector: 'app-search-visitor',
  templateUrl: './search-visitor.component.html',
  styleUrls: ['./search-visitor.component.scss']
})
export class SearchVisitorComponent {
  searchForm! : FormGroup
  isFormSubmitted: boolean = false;
  visitorsList: any[] = []
  columns: any[] = []
  searchString : string = "";
  
  constructor(private fb : FormBuilder,
              private visitor : VisitorManagementService,
              private utilities : UtilityService
  ) {
    this.searchForm = this.fb.group({
      search:['',[Validators.required,Validators.minLength(1)]]
    })
  }

  get f(){
    return this.searchForm.controls;
  }

  onSubmit(){
    this.isFormSubmitted = true;
    if(this.searchForm.valid){
      this.searchString = this.searchForm.get('search')?.value;
      this.getAllVisitors();
      console.log('Form Submitted:',this.searchForm.value);
    }else{
      console.log('Enter a valid search filter value');
    }
  }

  getAllVisitors(){
    const payload = {
      "searchString": this.searchString,
      "fromDate": "",
      "toDate": ""
    }
    this.visitor.getAllVisitors(payload).subscribe({
      next:(response:any)=>{
        this.visitorsList = response.data;
        if(response.token === 1 && response.statusCode === '200'){
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
        }else{
          // this.visitorsList = response.data;
        }
      },
      error:(error:any)=>{
        console.log('error',error);
      }
    });
  }


}
