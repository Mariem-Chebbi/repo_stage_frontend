import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DmadvserviceService } from '../../../../core/services/LSS_services/dmadvservice.service';

@Component({
  selector: 'ngx-checkbox',
  template: `
    <nb-checkbox [(checked)]="isChecked" (checkedChange)="onCheckboxChange($event)">
    </nb-checkbox>
  `,
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnChanges {
  @Input() rowData: any; // Input for the ctq object
  isChecked: boolean; // Checkbox state

  constructor(private service: DmadvserviceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.isChecked=this.rowData.met;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData']) {
      console.log('ngOnChanges - rowData:', this.rowData); // Debugging
      if (this.rowData) {
        this.isChecked = this.rowData.isMet ?? false; // Initialize checkbox state
        console.log('Checkbox initialized to:', this.isChecked); // Debugging
      }
      this.cdr.detectChanges(); // Ensure change detection if necessary
    }
  }

  onCheckboxChange(isChecked: boolean): void {
    console.log('Checkbox state changed:', isChecked); // Debugging
    if (isChecked) {
      this.service.ValidateCtq(this.rowData.id).subscribe(
        updatedCtq => {
          console.log('Validated CTQ:', updatedCtq); // Debugging
          this.isChecked = updatedCtq.met; // Update local state with backend response
        },
        error => {
          console.error('Error validating CTQ:', error);
        }
      );
    } else {
      this.service.UnvalidateCtq(this.rowData.id).subscribe(
        updatedCtq => {
          console.log('Unvalidated CTQ:', updatedCtq); // Debugging
          this.isChecked = updatedCtq.met; // Update local state with backend response
        },
        error => {
          console.error('Error unvalidating CTQ:', error);
        }
      );
    }
  }
}
