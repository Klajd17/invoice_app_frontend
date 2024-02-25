import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {ITEM_CREATE_UPDATE_ROUTE} from "../../shared/cons/global-constants";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private router: Router) { }

  async redirectToCreateUpdateItem(itemId: number, action: string) {
    await this.router.navigateByUrl(`${ITEM_CREATE_UPDATE_ROUTE}?data=${btoa(JSON.stringify({
      itemId: itemId,
      action: action
    }))}`);
  }
}
