import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {CustomerService} from "../../services/customer.service";
import {CustomerModel} from "../../models/customer-model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstants} from "../../../../shared/cons/global-constants";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  displayedColumns: string[] = ['name','email','phone','address','city','postalCode','country', 'edit'];
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

        // Use MatTableDataSource with paginator
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

  handleEditAction(element:any) {

  }
}
