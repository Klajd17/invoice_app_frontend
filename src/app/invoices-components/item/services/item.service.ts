import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemModel} from "../models/item-model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = environment.API_HOST;
  constructor(private httpClient:HttpClient) { }

  getItems(): Observable<ItemModel[]> {
    return this.httpClient.get<ItemModel[]>('/api/Items');
  }

  addItem(data: ItemModel) {
    return this.httpClient.post('/api/Items', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateItem(formData: ItemModel) {
    console.log(formData.id)
    const itemId = formData.id;
    return this.httpClient.put(`/api/Items/${itemId}`, formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getItem(itemId: number) {
    return this.httpClient.get(`/api/Items/${itemId}`);
  }
  deleteItem(itemId: number) {
    return this.httpClient.delete(`/api/Items/${itemId}`);
  }
}
