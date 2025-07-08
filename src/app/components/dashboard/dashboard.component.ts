import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisitorCount } from 'src/app/Models/VisitorCount';
import { VisitorManagementService } from 'src/app/services/visitor-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  visitorCount? : VisitorCount;

  visitorStats: { label: string; key: keyof VisitorCount; colorClass: string }[] = [
    { label: "Today's Visitors", key: 'todayVisitors', colorClass: 'blue' },
    { label: "Yesterday's Visitors", key: 'yesterdayVisitors', colorClass: 'green' },
    { label: 'Last 7 Days Visitors', key: 'lastWeekVisitors', colorClass: 'yellow' },
    { label: 'Total Visitors', key: 'totalVisitors', colorClass: 'red' }
  ];
  
  constructor(private router : Router, 
              private visitorService : VisitorManagementService,
              private toastr : ToastrService)
  {
  }



  ngOnInit(){
    this.getVisitorCount();
  }
  
  redirectTo(){
    this.router.navigate(['ManageVisitor']);
  }

  getVisitorCount(){
    this.visitorService.getVisitorCount().subscribe({
      next:(response:any)=>{
        if(response.token === 1 && response.statusCode === '200'){
          this.visitorCount = response.data;
          console.log(this.visitorCount)
        }
      },
      error:(error:any)=>{
        this.toastr.error('Error while getting visitor count');
      }
    })
  }
}
