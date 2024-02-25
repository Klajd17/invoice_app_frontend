import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {CustomerService} from "../../services/customer.service";
import {CustomerModel} from "../../models/customer-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ADD, GlobalConstants, UPDATE} from "../../../../shared/cons/global-constants";
import {DialogData} from "../../../../shared/models/general-response-model";
import {CustomerAddUpdateComponent} from "../customer-add-update/customer-add-update.component";
import {ConfirmationDialogComponent} from "../../../dialog/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name','email','phone','address','city','postalCode','country','view', 'edit', 'delete'];
  customerList: CustomerModel[] = [];
  dataSource: any;
  responseMessage: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private customerService: CustomerService, private ngxService: NgxUiLoaderService, private dialog: MatDialog,
              private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.customerService.getCustomers().subscribe({
      next: (response: CustomerModel[]) => {
        this.ngxService.stop();
        this.customerList = response;
        console.log(this.customerList);

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleUpdateAction(customer: CustomerModel) {
    const data: DialogData = new DialogData(customer, UPDATE, 'Update Customer');
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
          this.tableData();
        }
      }
    });
  }

  handleDeleteAction(customer: CustomerModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        message: ` continue with deletion of ${customer.name}?`
      }
    });

    dialogRef.componentInstance.onYes.subscribe(() => {
      dialogRef.close();
      this.customerService.deleteCustomer(customer.id).subscribe((_data) => {
        this.tableData();
        this.snackbarService.openSnackBar('\n' + 'Deletion completed successfully', 'OK');
      });
    });

    dialogRef.componentInstance.onNo.subscribe(() => {
      dialogRef.close();
    });
  }

  handleAddAction() {
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
          this.tableData();
        }
      }
    });
  }
}
