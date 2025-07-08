import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { concat } from 'rxjs';
import { NotifyVisitorService } from 'src/app/services/notify-visitor.service';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';
import { UtilityService } from 'src/Utilities/utility.service';

@Component({
  selector: 'app-manage-visitor',
  templateUrl: './manage-visitor.component.html',
  styleUrls: ['./manage-visitor.component.scss']
})
export class ManageVisitorComponent implements OnInit{
  visitorsList: any[] = []
  visitorFilter: string = '';
  columns: any[] = []
  showDialog = false;
  selectedVisitor : any = null;
  openDialogBox = false;
  text: string = 'The text';
  fullName : string = '';
  @ViewChild('confirmationDialogBox') confirmationDialogRef: any;
  @ViewChild('visitorSelect') visitorSelect!: ElementRef<HTMLSelectElement>;
  payload = {
    "searchString": "",
    "fromDate": "",
    "toDate": ""
  }
  visitorOptions = [
    {value:'TotalVisitors', label:'Total Visitors'},
    {value:'TodayVisitors', label:"Today's Visitors"},
    {value:'YesterdayVisitors', label:"Yesterday's Visitors"},
    {value:'LastWeekVisitors', label:'Last 7 days Visitors'}
  ]

  constructor(private visitor : VisitorManagementService,
              private utilities : UtilityService,
              private toastr : ToastrService,
              private route : ActivatedRoute,
              private notifyVisitor : NotifyVisitorService

  ) {}

  ngOnInit(){
    this.getAllVisitors();
    this.visitorFilter = this.route.snapshot.paramMap.get('visitor')!;
    console.log(this.visitorFilter)
  }

  // ngAfterViewInit() {
  //   this.visitorSelect.nativeElement.value = this.visitorFilter
  //   const selectedValue = this.visitorSelect.nativeElement.value
  //   if(selectedValue){
       
  //   }
  // }

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
            console.log(this.visitorsList)
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
        if(error.name === "HttpErrorResponse"){
          this.toastr.error("Server is down. Retry after some time");
        }else{
          this.toastr.error("Some technical issue. Retry after some time");          
        }
      }
    });
  }

  deleteVisitor(event:Event){
    console.log('from visitor management',event);
    this.selectedVisitor = event;
    this.fullName = this.selectedVisitor['First Name'].concat(' ', this.selectedVisitor['Last Name']);
    this.showModal(`Are you sure you want to delete visitor ${this.fullName}`);
  }

  public showModal(text: string) {
    this.text = text;
    this.confirmationDialogRef?.openModal();
  }

  performOperation(event:string){
    if(event === 'delete'){
      const payload = {
        "visitorId": this.selectedVisitor['Visitor Id']
      }
      console.log(payload)
      this.visitor.deleteVisitor(payload).subscribe({
        next:(response:any)=>{
          if(response.token === 1 && response.statusCode === '200'){
            this.visitorsList = this.visitorsList.filter(visitor => visitor['Visitor Id'] !== this.selectedVisitor['Visitor Id'])
            this.toastr.success('Deleted Successfully');
          }else{
            this.toastr.warning('Failed to delete')
          }
        },
        error:(error:any)=>{
          this.toastr.error('Some technical error')
        }
      })
    }
  }

  updateVisitorRequest(event:Event){
    console.log(event);
    this.selectedVisitor = event;
    const payload = {
      "firstName": this.selectedVisitor['First Name'],
      "lastName": this.selectedVisitor['Last Name'],
      "email": this.selectedVisitor['Email Id'],
      "visitorPass": this.selectedVisitor['Visitor Pass'],
      "status": this.selectedVisitor['updatedTo'],
      "visitorId":  this.selectedVisitor['Visitor Id']
    }

    console.log(payload);

    this.notifyVisitor.rejectVisitorRequestService(payload).subscribe({
      next:(response:any)=>{
        if(response.token === 1 && response.statusCode === '200'){
          payload.status === 'Approved' ?
            this.toastr.success('Visitor request approved successfully') :
            this.toastr.success('Visitor request rejected');
            console.log(this.visitorsList)
            this.visitorsList = this.visitorsList.map(v =>
              v['Visitor Id'] === this.selectedVisitor['Visitor Id']
                ? { ...v, ['Status']: this.selectedVisitor['updatedTo'] }
                : v
            );
        }
        else{
          this.toastr.warning('Failed to cancel visitor request');
        }
      },
      error:(error:any)=>{
        this.toastr.error('Some technical error')
      }
    })
  }

  exitVisitor(event:Event){
    console.log(event);
    this.selectedVisitor = event;
    const now = new Date();
    const exitTime = now.toTimeString().split(' ')[0];
    const payload = {
      "visitorId":  this.selectedVisitor['Visitor Id'],
      "exitTime": exitTime
  }
  this.visitor.updateVisitor(payload).subscribe({
    next:(response:any)=>{
      if(response.token === 1 && response.statusCode === '200'){
        this.toastr.success('Visitor updated successfully!');
        // this.visitForm.get('exitTime')?.disable();
        this.visitorsList = this.visitorsList.map(v =>
          v['Visitor Id'] === this.selectedVisitor['Visitor Id']
            ? { ...v, ['Exit Time']: payload.exitTime }
            : v
        );
      }else{
        this.toastr.warning('Some technical issue while updating visitor');
      }
    },
    error:(error:any)=>{
      this.toastr.error('Error while updating visitor');
    }
  })
  }
  
}
  

