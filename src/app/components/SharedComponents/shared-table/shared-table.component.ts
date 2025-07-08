import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
  @Output() onDeleteVisitor = new EventEmitter<any>();
  @Output() updateVisitorRequest = new EventEmitter<any>();
  @Output() updateExitVisitorTime = new EventEmitter<any>();
  sidebarShow:boolean = false;
  currentPage: number = 1;
  totalPages: number = 1;
  activeMenuRow: any = null;


  constructor(private router : Router) {
    
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.calculateTotalPages();
    console.log(this.columns)
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

  updateVisitor(visitor: any){
    console.log('paginated data',this.paginatedData)
    console.log('update visitor',visitor)
    this.router.navigate(['UpdateVisitor',visitor['Visitor Id']]);
    visitor.showMenu = !visitor.showMenu    
  }

  deleteVisitor(visitor : any){
    this.onDeleteVisitor.emit(visitor);
    console.log(visitor)
    visitor.showMenu = !visitor.showMenu
  }

  updateRequest(visitor : any, status : string){
    visitor.updatedTo = status;
    this.updateVisitorRequest.emit(visitor);
    visitor.showMenu = !visitor.showMenu
  }

  exitVisitor(row:any){
    console.log(row)
    this.updateExitVisitorTime.emit(row)
  }

  toggleRowMenu(row: any): void {
    if (this.activeMenuRow === row) {
      this.activeMenuRow = null;
    } else {
      this.activeMenuRow = row;
    }
  }

}
