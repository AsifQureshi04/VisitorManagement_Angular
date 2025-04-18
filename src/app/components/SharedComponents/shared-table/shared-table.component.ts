import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() columns: string[] = [];
  @Input() pageSize: number = 5;

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private router : Router) {
    
  }
  ngOnInit(): void {
  }

  ngOnChanges(){
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    console.log('tableData.length',this.tableData.length);
    console.log('pageSize',this.pageSize);

    this.totalPages = Math.ceil(this.tableData.length / this.pageSize);
    console.log('total pages',this.totalPages);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tableData.slice(start, start + this.pageSize);
  }

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.totalPages;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updateVisitor(visitorId : number){
    console.log('paginated data',this.paginatedData)
    console.log('update visitor',visitorId)
    this.router.navigate(['UpdateVisitor',visitorId]);
  }

  deleteVisitor(visitorId : number){

  }
}
