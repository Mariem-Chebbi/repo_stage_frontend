import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-details-button',
  template: `<button nbButton status="info" (click)="onClick()">Show Details</button>`,
  styles: []
})
export class DetailsButtonComponent {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() showDetails: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.showDetails.emit(this.rowData);
  }
}
