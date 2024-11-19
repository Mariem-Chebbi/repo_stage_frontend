import { Component, OnInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  template: `
    <input
      nbInput
      fullWidth
      placeholder="Select Date"
      [(ngModel)]="cell.newValue"
      [nbDatepicker]="datepicker"
    />
    <nb-datepicker #datepicker></nb-datepicker>
  `,
})
export class DatepickerEditorComponent extends DefaultEditor implements OnInit {
  ngOnInit() {
    if (!this.cell.newValue) {
      this.cell.newValue = '';
    }
  }
}
