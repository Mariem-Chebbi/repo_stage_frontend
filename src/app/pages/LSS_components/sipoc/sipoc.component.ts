import { Component, OnInit } from '@angular/core';
import { SIPOCserviceService } from '../../../core/services/LSS_services/sipocservice';
import { Sipoc } from '../../../core/models/LSS_models/Sipoc';
import { Supplier } from '../../../core/models/LSS_models/Supplier';
import { Input } from '../../../core/models/LSS_models/Input';
import { Process } from '../../../core/models/LSS_models/Process';
import { Output } from '../../../core/models/LSS_models/Output';
import { Customer } from '../../../core/models/LSS_models/Customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-sipoc',
  templateUrl: './sipoc.component.html',
  styleUrls: ['./sipoc.component.scss']
})
export class SipocComponent implements OnInit {
  suppliers: Supplier[] = [];
  inputs: Input[] = [];
  processes: Process[] = [];
  outputs: Output[] = [];
  customers: Customer[] = [];
  sipocId: string;
  newSupplier: Supplier = { id_supplier: '', name: '' };
  newInput: Input = { id_input: '', name: '' };
  newProcess: Process = { id_process: '', name: '' };
  newOutput: Output = { id_output: '', name: '' };
  newCustomer: Customer = { id_customer: '', name: '' };
  selectedCharterId$: string;
  selectedSipocId: string; // Variable to hold the selected SIPOC ID
  showAddSupplierForm: boolean = false; 
  showAddInputForm: boolean = false; 
  showAddProcessForm: boolean = false; 
  showAddOutputForm: boolean = false; 
  showAddCustomerForm: boolean = false; 
  hasSipoc: boolean = false;

  showError = false;

  selectedSupplier: Supplier = { id_supplier: '', name: '' };
  showEditSupplierForm = false;
  selectedInput: Input = { id_input: '', name: '' };
  showEditInputForm = false;
  selectedProcess: Process = { id_process: '', name: '' };
  showEditProcessForm = false;
  selectedOutput: Output = { id_output: '', name: '' };
  showEditOutputForm = false;
  selectedCustomer: Customer = { id_customer: '', name: '' };
  showEditCustomerForm = false;

  noSipocMessage: string = ''; 
  noCharterSelectedMessage: string = ''; 

  constructor(private sipocservice: SIPOCserviceService) {}

  ngOnInit(): void {
    this.sipocservice.selectedCharterId$.subscribe(charterId => {
      console.log('Received charter ID:', charterId); // Check if charterId is being logged
      this.selectedCharterId$ = charterId;
      if (charterId) {
        this.loadSIPOCs(charterId);
      }
    });
  }
  onCharterSelect(charterId: string): void {
    this.selectedCharterId$ = charterId;
    this.noCharterSelectedMessage = ''; // Clear any previous error message
    this.loadSIPOCs(charterId);
  }
  deleteSipoc() {
    const confirmed = confirm('Are you sure you want to delete this sipoc?');
    if (confirmed) {
    if (this.sipocId) {
      this.sipocservice.deleteSipoc(this.sipocId).subscribe(() => {
        // Handle successful deletion, such as reloading data or showing a message
        this.sipocId = null;
        this.hasSipoc = false; // Update flag after deletion
        this.loadSIPOCs(this.selectedCharterId$); // Reload SIPOCs
      });
    }
  }}
  createSipoc(): void {
    if (!this.selectedCharterId$) {
      this.noCharterSelectedMessage = 'Please select a Project Charter.';
      return;
    }

    // Clear any previous error message
    this.noCharterSelectedMessage = '';

    const newSipoc: Sipoc = {
      id_sipoc: '',
      idproject: this.selectedCharterId$,
      supplier_sipoc: [{ id_supplier: '', name: '' }],
      input_sipoc: [],
      process_sipoc: [],
      output_sipoc: [],
      customer_sipoc: [],
      addDate: new Date() // Or set to undefined if preferred
    };

    this.sipocservice.createSipoc(this.selectedCharterId$, newSipoc).subscribe(
      response => {
        console.log('New SIPOC created successfully:', response);
        // Optionally refresh the list or handle the response
        this.loadSIPOCs(this.selectedCharterId$);
      },
      error => {
        console.error('Error creating SIPOC:', error);
      }
    );
  }
  loadSIPOCs(charterId: string) {
    console.log('Loading SIPOCs for charter ID:', charterId);
    this.sipocservice.getSipocByProjectCharterId(charterId).subscribe(
      data => {
        console.log('Fetched SIPOC data:', data);
        if (data && data.id_sipoc) {
          this.sipocId = data.id_sipoc; // Save the SIPOC ID for later use
          this.suppliers = data.supplier_sipoc || [];
          this.inputs = data.input_sipoc || [];
          this.processes = data.process_sipoc || [];
          this.outputs = data.output_sipoc || [];
          this.customers = data.customer_sipoc || [];
          this.selectedSipocId = data.id_sipoc;
          this.hasSipoc = true; // Set flag to true if SIPOC exists
          this.noCharterSelectedMessage = '';
          this.noSipocMessage = ''; // Clear message if SIPOC exists
        } else {
          this.hasSipoc = false; // Set flag to false if SIPOC does not exist
          this.noSipocMessage = 'No SIPOC available for this charter.';
          this.noCharterSelectedMessage = '';

        }
        console.log('Transformed SIPOC data:', this.suppliers, this.inputs, this.processes, this.outputs, this.customers);
      },
      error => {
        console.error('Error fetching SIPOCs', error);
        this.hasSipoc = false; // Set flag to false on error
        this.noSipocMessage = 'Error fetching SIPOC data.';
      }
    );
  }
  toggleAddSupplierForm() {
    this.showAddSupplierForm = !this.showAddSupplierForm;
  }
  toggleAddInputForm() {
    this.showAddInputForm = !this.showAddInputForm;
  }
  toggleAddProcessForm() {
    this.showAddProcessForm = !this.showAddProcessForm;
  }
  toggleAddOutputForm() {
    this.showAddOutputForm = !this.showAddOutputForm;
  }
  toggleAddCustomerForm() {
    this.showAddCustomerForm = !this.showAddCustomerForm;
  }

  addSupplier(supplierForm: NgForm) {
    if (this.selectedSipocId && this.newSupplier.name) {
      this.sipocservice.addSupplier(this.selectedSipocId, this.newSupplier).subscribe(
        (response) => {
          console.log('Supplier added successfully:', response);
          if (response) {
            this.suppliers.push(response);
            this.newSupplier = { id_supplier: '', name: '' };
            this.showAddSupplierForm = false;
            this.loadSIPOCs(this.selectedCharterId$)
            if (supplierForm) {
              supplierForm.resetForm();
            }
          }
        },
        (error) => {
          console.error('Error adding supplier:', error);
        }
      );
    } else {
      console.log('No valid SIPOC ID or supplier name');
      if (supplierForm && supplierForm.controls['supplierName']) {
        supplierForm.controls['supplierName'].markAsTouched();
      }
    }
  }
  

  addInput(inputForm: NgForm) {
    if (this.selectedSipocId && this.newInput.name) {
      console.log('Adding input:', this.newInput);
      this.sipocservice.addInput(this.selectedSipocId, this.newInput).subscribe(
        (response) => {
          console.log('Input added successfully:', response);
          if (response) {
            this.inputs.push(response);
            this.newInput = {id_input:'', name: '' };
            this.showAddInputForm = false;
            inputForm.resetForm();
            this.loadSIPOCs(this.selectedCharterId$)

          }
        },
        (error) => {
          console.error('Error adding input:', error);
        }
      );
    } else {
      console.log('No valid SIPOC ID or input name');
      inputForm.controls['inputName'].markAsTouched();
    }
  }

  addProcess(processForm: NgForm) {
    if (this.selectedSipocId && this.newProcess.name) {
      console.log('Adding process:', this.newProcess);
      this.sipocservice.addProcess(this.selectedSipocId, this.newProcess).subscribe(
        (response) => {
          console.log('Process added successfully:', response);
          if (response) {
            this.processes.push(response);
            this.newProcess = {id_process:'', name: '' };
            this.showAddProcessForm = false;
            processForm.resetForm();
            this.loadSIPOCs(this.selectedCharterId$)

          }
        },
        (error) => {
          console.error('Error adding process:', error);
        }
      );
    } else {
      console.log('No valid SIPOC ID or process name');
      processForm.controls['processName'].markAsTouched();
    }
  }
  addOutput(outputForm: NgForm) {
    if (this.selectedSipocId && this.newOutput.name) {
      console.log('Adding output:', this.newOutput);
      this.sipocservice.addOutput(this.selectedSipocId, this.newOutput).subscribe(
        (response) => {
          console.log('Output added successfully:', response);
          if (response) {
            this.outputs.push(response);
            this.newOutput = {id_output:'', name: '' };
            this.showAddOutputForm = false;
            outputForm.resetForm();
            this.loadSIPOCs(this.selectedCharterId$)

          }
        },
        (error) => {
          console.error('Error adding output:', error);
        }
      );
    } else {
      console.log('No valid SIPOC ID or output name');
      outputForm.controls['outputName'].markAsTouched();
    }
  }
  addCustomer(customerForm: NgForm) {
    if (this.selectedSipocId && this.newCustomer.name) {
      console.log('Adding customer:', this.newCustomer);
      this.sipocservice.addCustomer(this.selectedSipocId, this.newCustomer).subscribe(
        (response) => {
          console.log('Customer added successfully:', response);
          if (response) {
            this.customers.push(response);
            this.newCustomer = {id_customer:'', name: '' };
            this.showAddCustomerForm = false;
            customerForm.resetForm();
            this.loadSIPOCs(this.selectedCharterId$)

          }
        },
        (error) => {
          console.error('Error adding customer:', error);
        }
      );
    } else {
      console.log('No valid SIPOC ID or customer name');
      customerForm.controls['customerName'].markAsTouched();
    }
  }

  updateSupplier() {
    if (this.selectedSupplier.id_supplier && this.selectedSupplier.name) {
      this.sipocservice.updateSupplier(this.selectedSupplier.id_supplier, this.selectedSupplier).subscribe(
        (response) => {
          console.log('Supplier updated successfully:', response);
          this.showEditSupplierForm = false;
          this.showError = false;
          this.loadSIPOCs(this.selectedCharterId$)

        },
        (error) => {
          console.error('Error updating supplier:', error);
        }
      );
    } else {
      this.showError = true;
    }
  }

  editSupplier(supplier: Supplier) {
    this.selectedSupplier = { ...supplier };
    this.showEditSupplierForm = true;
    this.showError = false;
  }


  updateInput() {
    if (this.selectedInput.name) {
      this.sipocservice.updateInput(this.selectedInput.id_input, this.selectedInput).subscribe(
        (response) => {
          console.log('Input updated successfully:', response);
          this.showEditInputForm = false;
          this.showError = false;
          this.loadSIPOCs(this.selectedCharterId$)

        },
        (error) => {
          console.error('Error updating input:', error);
        }
      );
    } else {
      this.showError = true;
    }
  }

  editInput(input: Input) {
    this.selectedInput = { ...input };
    this.showEditInputForm = true;
    this.showError = false;
  }
  updateProcess() {
    if (this.selectedProcess.name) {
      this.sipocservice.updateProcess(this.selectedProcess.id_process, this.selectedProcess).subscribe(
        (response) => {
          console.log('Process updated successfully:', response);
          this.showEditProcessForm = false;
          this.showError = false;
          this.loadSIPOCs(this.selectedCharterId$)

        },
        (error) => {
          console.error('Error updating process:', error);
        }
      );
    } else {
      this.showError = true;
    }
  }

  updateOutput() {
    if (this.selectedOutput.name) {
      this.sipocservice.updateOutput(this.selectedOutput.id_output, this.selectedOutput).subscribe(
        (response) => {
          console.log('Output updated successfully:', response);
          this.showEditOutputForm = false;
          this.showError = false;
          this.loadSIPOCs(this.selectedCharterId$)

        },
        (error) => {
          console.error('Error updating output:', error);
        }
      );
    } else {
      this.showError = true;
    }
  }
  updateCustomer() {
    if (this.selectedCustomer.name) {
      this.sipocservice.updateCustomer(this.selectedCustomer.id_customer, this.selectedCustomer).subscribe(
        (response) => {
          console.log('Customer updated successfully:', response);
          this.showEditCustomerForm = false;
          this.showError = false;
          this.loadSIPOCs(this.selectedCharterId$)

        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
    } else {
      this.showError = true;
    }
  }
  editProcess(process: Process) {
    this.selectedProcess = { ...process };
    this.showEditProcessForm = true;
    this.showError = false;
  }

  editOutput(output: Output) {
    this.selectedOutput = { ...output };
    this.showEditOutputForm = true;
    this.showError = false;
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.showEditCustomerForm = true;
    this.showError = false;
  }
  removeSupplier(supplierId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {

    this.sipocservice.removeSupplier(this.sipocId, supplierId).subscribe(
      data => {
        console.log('Supplier removed:', data);
        this.suppliers = data.supplier_sipoc || [];
      },
      error => {
        console.error('Error removing supplier', error);
      }
    );
  }
  }
  removeInput(intputId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
    this.sipocservice.removeInput(this.sipocId, intputId).subscribe(
      data => {
        console.log('input removed:', data);
        this.inputs = data.input_sipoc || [];
      },
      error => {
        console.error('Error removing input', error);
      }
    );}
  }
  removeProcess(processId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
    this.sipocservice.removeProcess(this.sipocId, processId).subscribe(
      data => {
        console.log('process removed:', data);
        this.processes = data.process_sipoc || [];
      },
      error => {
        console.error('Error removing process', error);
      }
    );}
  }
  removeOutput(outputId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
    this.sipocservice.removeOutput(this.sipocId, outputId).subscribe(
      data => {
        console.log('output removed:', data);
        this.outputs = data.output_sipoc || [];
      },
      error => {
        console.error('Error removing output', error);
      }
    );}
  }
  removeCustomer(customerId: string) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
    this.sipocservice.removeCustomer(this.sipocId, customerId).subscribe(
      data => {
        console.log('customer removed:', data);
        this.customers = data.customer_sipoc || [];
      },
      error => {
        console.error('Error removing customer', error);
      }
    );}
  }
}
