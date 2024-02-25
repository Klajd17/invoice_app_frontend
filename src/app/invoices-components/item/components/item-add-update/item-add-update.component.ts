import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ADD, GlobalConstants, UPDATE} from "../../../../shared/cons/global-constants";
import {ItemModel} from "../../models/item-model";
import {DataHelperModel} from "../../../../shared/models/general-response-model";
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../../services/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackbarService} from "../../../../core/services/snackbar.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {map} from "rxjs";
@Component({
  selector: 'app-item-add-update',
  templateUrl: './item-add-update.component.html',
  styleUrls: ['./item-add-update.component.scss']
})
export class ItemAddUpdateComponent implements OnInit {
  ADD = ADD;
  UPDATE = UPDATE;
  itemForm: FormGroup = new FormGroup({});
  action: string = '';
  itemId: number = 0;
  itemById: Object = new ItemModel();
  data: DataHelperModel = new DataHelperModel();
  private responseMessage: any;
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private itemService:ItemService,private router: Router,
              private snackbarService: SnackbarService,private ngxService: NgxUiLoaderService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initItemFG();
    this.readFromURL();
  }
  handleAddItem() {
    this.ngxService.start();

   if(this.itemForm.valid){
     this.itemService.addItem(this.itemForm.value).subscribe({
       next: (response: any) => {
         this.ngxService.stop();
         this.snackbarService.openSnackBar('Item added successfully!', 'success');
         this.router.navigate(['invoice-app/item']);
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
     this.itemForm.markAllAsTouched();
   }
  }

  handleUpdateItem() {
    console.log(this.itemForm.value)
    this.ngxService.start();

    if(this.itemForm.valid){
      this.itemService.updateItem(this.itemForm.value).subscribe({
        next: (response: any) => {
          this.ngxService.stop();
          this.snackbarService.openSnackBar('Item updated successfully!', 'success');
          this.router.navigate(['invoice-app/item']);
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
      this.itemForm.markAllAsTouched();
    }
  }

  detectAction() {
    console.log(this.action)
    this.action = this.itemId ? UPDATE : ADD;
    if (this.action === UPDATE) {
      console.log(this.action)
      console.log(this.itemById);
      this.itemForm.patchValue(this.itemById);
    }
  }

  getItemById() {
    return this.itemService.getItem(this.itemId).pipe(
      map(res => {
        if (this.itemId) {
          this.itemById = res;
          console.log(res);
        }
      })
    );
  }

  readFromURL() {
    this.itemId = Number(this.activeRoute.snapshot.paramMap.get('id'));
    console.log(this.itemId);

    if (this.itemId) {
      this.getItemById().subscribe(() => {
        this.detectAction();
      });
    } else {
      this.detectAction();
    }
  }

  initItemFG() {
    this.itemForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      description: new FormControl(''),
      itemType: new FormControl(0),
      vatRate: new FormControl(0, [Validators.required, Validators.min(0)]),
      weight: new FormControl(0, [Validators.required, Validators.min(0)]),
      length: new FormControl(0),
      width: new FormControl(0),
      height: new FormControl(0),
      sku: new FormControl(''),
      barcode: new FormControl(''),
      manufacturer: new FormControl(''),
      brand: new FormControl('', Validators.required),
      model: new FormControl(''),
      color: new FormControl(''),
      size: new FormControl(''),
      material: new FormControl(''),
      countryOfOrigin: new FormControl(''),
      warranty: new FormControl(''),
      supplier: new FormControl('', Validators.required),
      uom: new FormControl(''),
    });
  }

}
