import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { UtilityService } from 'src/Utilities/utility.service';

@Component({
  selector: 'app-manage-visitor',
  templateUrl: './manage-visitor.component.html',
  styleUrls: ['./manage-visitor.component.scss']
})
export class ManageVisitorComponent implements OnInit{
  visitorsList: any[] = []
  columns: any[] = []

  ngOnInit(){
    this.getAllVisitors();
  }

  constructor(private visitor : VisitorManagementService,
              private utilities : UtilityService
  ) {
    
  }

  getAllVisitors(){
    const payload = {
      "searchString": "",
      "fromDate": "",
      "toDate": ""
    }
    this.visitor.getAllVisitors(payload).subscribe({
      next:(response:any)=>{
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
  

