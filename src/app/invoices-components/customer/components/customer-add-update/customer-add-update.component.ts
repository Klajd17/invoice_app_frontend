import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../../services/customer.service";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {DialogData} from "../../../../shared/models/general-response-model";
import {ADD, GlobalConstants, UPDATE} from "../../../../shared/cons/global-constants";

@Component({
  selector: 'app-customer-add-update',
  templateUrl: './customer-add-update.component.html',
  styleUrls: ['./customer-add-update.component.scss']
})
export class CustomerAddUpdateComponent implements OnInit {
  ADD = ADD;
  UPDATE = UPDATE;
  customerForm: FormGroup = new FormGroup({});
  action: string = '';
  responseMessage: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService,
              private snackbarService: SnackbarService, private dialogRef: MatDialogRef<CustomerAddUpdateComponent>,
              private ngxService: NgxUiLoaderService,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.initCustomerFG();
    this.detectAction();
  }

  handleAddCustomer() {
    this.ngxService.start();
    console.log(this.customerForm)
    if (this.customerForm.valid){
      this.customerService.addCustomer(this.customerForm.value).subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close(true);
          this.snackbarService.openSnackBar('Customer added successfully!', 'success');
        },
        error: (error) => {
          this.ngxService.stop();
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
    }else {
      this.customerForm.markAllAsTouched();
      this.ngxService.stop();
    }
  }

  handleUpdateCustomer() {
    this.ngxService.start();

    if(this.customerForm.valid){
      this.customerService.updateCustomer(this.customerForm.value).subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close(true);
          console.log(response)
          this.snackbarService.openSnackBar('Customer updated successfully!', 'success');
        },
        error: (error) => {
          this.ngxService.stop();
          if (error.error?.message) {
            this.responseMessage = error.error?.message;
          } else {
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
    }else{
      this.customerForm.markAllAsTouched();
      this.ngxService.stop();
    }
  }


  detectAction() {
    this.action = this.data.action;
    if (this.action == UPDATE) {
      this.customerForm.patchValue(this.data.values);
    }
  }

  initCustomerFG(){
    this.customerForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
    });
  }
  closeDialog(id: any): void {
    this.dialogRef.close(id);
  }

}
