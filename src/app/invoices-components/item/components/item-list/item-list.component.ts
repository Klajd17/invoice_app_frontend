import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {MatTableDataSource} from "@angular/material/table";
import {ADD, GlobalConstants, UPDATE} from "../../../../shared/cons/global-constants";
import {DialogData} from "../../../../shared/models/general-response-model";
import {ConfirmationDialogComponent} from "../../../dialog/confirmation-dialog/confirmation-dialog.component";
import {ItemModel} from "../../models/item-model";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  displayedColumns: string[] = ['name','code','price','vatRate','brand','supplier','weight','view', 'edit', 'delete'];
  itemList: ItemModel[] = [];
  dataSource: any;
  responseMessage: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private itemService: ItemService, private ngxService: NgxUiLoaderService, private dialog: MatDialog,
              private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.itemService.getItems().subscribe({
      next: (response: ItemModel[]) => {
        this.ngxService.stop();
        this.itemList = response;
        console.log(this.itemList);

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

  handleDeleteAction(item: ItemModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: {
        message: ` continue with deletion of ${item.name}?`
      }
    });

    dialogRef.componentInstance.onYes.subscribe(() => {
      dialogRef.close();
      this.itemService.deleteItem(item.id).subscribe((_data) => {
        this.tableData();
        this.snackbarService.openSnackBar('\n' + 'Deletion completed successfully', 'OK');
      });
    });

    dialogRef.componentInstance.onNo.subscribe(() => {
      dialogRef.close();
    });
  }


  handleAddAction() {
    this.router.navigate(['/invoice-app/item-add-update'])
  }

  handleUpdateAction(itemId: number) {
    this.router.navigate(['/invoice-app/item-add-update/', itemId]);
  }
}
