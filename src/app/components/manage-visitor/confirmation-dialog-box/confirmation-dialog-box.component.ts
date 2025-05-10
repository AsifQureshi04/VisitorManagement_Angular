import { Component, Input, OnInit, ElementRef, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-confirmation-dialog-box',
  templateUrl: './confirmation-dialog-box.component.html',
  styleUrls: ['./confirmation-dialog-box.component.scss']
})
export class ConfirmationDialogBoxComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() text!: string;
  @Input() modalId!: string;
  @Input() closeLabel!: string;
  @Input() saveLabel!: string;
  modalInstance: any;
  @Output() operation = new EventEmitter<any>()

  @ViewChild('modalElement') modalElementRef!: ElementRef;



  ngOnInit() {}

  ngAfterViewInit() {
    // Initialize Bootstrap modal instance
    if (this.modalElementRef) {
      this.modalInstance = new bootstrap.Modal(this.modalElementRef.nativeElement);
    }
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal(cancel:string) {
    this.modalInstance?.hide();
    this.operation.emit(cancel);
  }

  saveChangeModal(operation: string) {
    console.log('Operation to perform:', operation);
    this.operation.emit(operation);
    this.modalInstance?.hide();
  }


}
