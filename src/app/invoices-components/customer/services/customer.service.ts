import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {CustomerModel} from "../models/customer-model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = environment.API_HOST;
  constructor(private httpClient:HttpClient) { }

  getCustomers(): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel[]>('/api/Customers');
  }

  addCustomer(data: CustomerModel) {
    return this.httpClient.post(this.url + 'api/Customers', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
