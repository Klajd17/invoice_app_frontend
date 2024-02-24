import {Injectable} from '@angular/core';

export interface Menu{
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {state: 'invoice', name: 'Invoices', icon: 'account_balance', role: ''},
  {state: 'item', name: 'Items', icon: 'inventory_2', role: ''},
  {state: 'customer', name: 'Customers', icon: 'account_circle', role: ''},
];

@Injectable()
export class MenuItems{
  getMenuitem(): Menu[]{
    return MENUITEMS;
  }
}
