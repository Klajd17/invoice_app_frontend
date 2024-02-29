import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {Router} from "@angular/router";
import {GeneralService} from "../../../../core/services/general.service";
import {ItemService} from "../../../item/services/item.service";
import {CustomerService} from "../../../customer/services/customer.service";
import {InvoiceService} from "../../services/invoice.service";
import {CustomerModel} from "../../../customer/models/customer-model";
import {ADD, GlobalConstants, ITEM_TYPES} from "../../../../shared/cons/global-constants";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ItemModel} from "../../../item/models/item-model";
import {DialogData} from "../../../../shared/models/general-response-model";
import {
  CustomerAddUpdateComponent
} from "../../../customer/components/customer-add-update/customer-add-update.component";
import {PdfService} from "../../../../shared/services/pdf.service";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  customerList: CustomerModel[] = [];
  filteredItemList: ItemModel[] = [];
  itemList: ItemModel[] = [];
  invoiceForm: FormGroup = new FormGroup({});
  responseMessage: any;
  selectedItems: { item: ItemModel, quantity: number }[] = [];

  constructor(private pdfService: PdfService, private formBuilder: FormBuilder, private invoiceService: InvoiceService, private itemService: ItemService, private customerService: CustomerService, private ngxService: NgxUiLoaderService,
              private dialog: MatDialog, private snackbarService: SnackbarService, private router: Router, private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.getCustomerList();
    this.getItemList();
    this.initInvoiceFG();
  }

  getCustomerList() {
    this.customerService.getCustomers().subscribe({
      next: (response: CustomerModel[]) => {
        this.ngxService.stop();
        this.customerList = response;
        console.log(this.customerList);
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
  }

  getItemList() {
    this.itemService.getItems().subscribe({
      next: (response: ItemModel[]) => {
        this.ngxService.stop();
        this.itemList = response;
        this.filteredItemList = this.itemList;
        console.log(this.itemList);
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
  }

  initInvoiceFG() {
    this.invoiceForm = this.formBuilder.group({
      invoiceDate: new FormControl(new Date(), Validators.required),
      invoiceNumber: new FormControl(uuidv4()),
      customerId: new FormControl(null, Validators.required),
      totalAmount: new FormControl(0, Validators.required),
      totalVatAmount: new FormControl(0, Validators.required),
      totalDiscountAmount: new FormControl(0, Validators.required),
      subTotal: new FormControl(0, Validators.required),
      isPaid: new FormControl(false, Validators.required),
      notes: new FormControl(null),
      user: new FormControl('Klajdi', Validators.required),
      invoiceLines: new FormArray([],[this.invoiceLinesValidator]),
    });
  }

  get invoiceLines() {
    return this.invoiceForm.get('invoiceLines') as FormArray;
  }

  invoiceLinesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormArray && control.length === 0) {
      return { 'invoiceLinesRequired': true };
    }
    return null;
  };

  removeInvoiceLine(index: number): void {
    const invoiceLines = this.invoiceForm.get('invoiceLines') as FormArray;
    invoiceLines.removeAt(index);
  }

  initInvoiceLine(): FormGroup {
    return this.formBuilder.group({
      itemId: new FormControl(0, Validators.required),
      itemName: new FormControl('string', Validators.required),
      itemCode: new FormControl('string', Validators.required),
      vatRate: new FormControl(0, Validators.required),
      quantity: new FormControl(1, Validators.required),
      uom: new FormControl('string', Validators.required),
      unitPrice: new FormControl(0, Validators.required),
      discountPercent: new FormControl(0, Validators.required),
      notes: new FormControl('string'),
      lineTotal: new FormControl(0),
    });
  }

  selectItem(item: ItemModel): void {
    const existingLine = this.invoiceLines.controls.find(
      (line) => line.get('itemId')?.value === item.id
    );

    if (existingLine) {
      const currentQuantity = existingLine.get('quantity')?.value || 0;
      const newQuantity = currentQuantity + 1;
      existingLine.patchValue({
        quantity: newQuantity,
      });
      // Updated lineTotal after updating the quantity
      const lineTotal = this.calculateTotalForLine(existingLine);
      existingLine.patchValue({
        lineTotal: lineTotal,
      });
    } else {
      const newItemFormGroup = this.initInvoiceLine();
      newItemFormGroup.patchValue({
        itemId: item.id,
        itemName: item.name,
        itemCode: item.code,
        vatRate: item.vatRate,
        uom: item.uom,
        unitPrice: item.price,
        discountPercent: 0,
        quantity: 1,
        notes: '',
      });
      const lineTotal = this.calculateTotalForLine(newItemFormGroup);
      newItemFormGroup.patchValue({
        lineTotal: lineTotal,
      });

      this.invoiceLines.push(newItemFormGroup);
    }

    console.log(this.invoiceLines);
  }


  handleInputChange(event: any,line:any) {
    const newLineTotal = this.calculateTotalForLine(line);
    line.patchValue({
      lineTotal: newLineTotal,
    });

    this.calculateSubTotal();
    this.calculateTotalVatAmount();
    this.calculateFinalTotal();
  }


  //Calculations
  calculateTotalForLine(line: AbstractControl): number {
    const quantity = line.get('quantity')?.value || 0;
    const unitPrice = line.get('unitPrice')?.value || 0;
    const discountPercent = line.get('discountPercent')?.value || 0;
    let lineTotal = quantity * unitPrice;
    const discount = lineTotal * discountPercent;
    return lineTotal - discount;
  }

  calculateSubTotal(): number {
    const invoiceLines = this.invoiceForm.get('invoiceLines') as FormArray;
    const subTotal = invoiceLines.controls.reduce((total, line) => total + this.calculateTotalForLine(line as FormGroup), 0);

    // Patch totalAmount in the form
    this.invoiceForm.patchValue({
      subTotal: subTotal
    });

    return subTotal;
  }

  calculateTotalVatAmount(): number {
    const subTotal = this.calculateSubTotal();

    const invoiceLines = this.invoiceForm.get('invoiceLines') as FormArray;
    const vatRateControls = invoiceLines.controls.map((line) => line.get('vatRate') as FormControl);

    const vatRates = vatRateControls.map((control) => control.value || 0);

    const vatAmount = subTotal * (Math.max(...vatRates));

    return vatAmount;
  }

  calculateFinalTotal(): number {
    const subTotal = this.calculateSubTotal();

    const invoiceLines = this.invoiceForm.get('invoiceLines') as FormArray;
    const vatRateControls = invoiceLines.controls.map((line) => line.get('vatRate') as FormControl);

    const vatRates = vatRateControls.map((control) => control.value || 0);

    const vatAmount = subTotal * (Math.max(...vatRates));

    this.invoiceForm.patchValue({
      totalVatAmount: vatAmount
    });

    const finalTotal = subTotal + vatAmount;
    this.invoiceForm.patchValue({
      totalAmount: finalTotal
    });

    return finalTotal;
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItemList = this.itemList.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  handleInvoiceGenerate() {
    this.ngxService.start();
    console.log(this.invoiceForm.value);
    this.pdfService.generateInvoicePDF(this.invoiceForm.value);

    if (this.invoiceForm.valid) {
      this.invoiceService.addInvoice(this.invoiceForm.value).subscribe({
        next: (response: any) => {
          this.pdfService.generateInvoicePDF(this.invoiceForm.value);
          this.ngxService.stop();
          this.snackbarService.openSnackBar('Invoice generated successfully!', 'success');
          this.invoiceForm.reset();
          this.invoiceLines.clear();
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
    } else {
      this.invoiceForm.markAllAsTouched();
      this.ngxService.stop();
    }
  }


  addNewCustomer() {
    const data: DialogData = new DialogData(null, ADD, 'Add Customer');
    const dialogRef = this.dialog.open(CustomerAddUpdateComponent, {
      width: '580px',
      maxWidth: '850px',
      height: 'auto',
      disableClose: true,
      data: data
    });

    dialogRef.afterClosed().subscribe({
      next: (shouldRefresh: Boolean) => {
        if (shouldRefresh) {
          this.getCustomerList();
        }
      }
    });
  }
}
