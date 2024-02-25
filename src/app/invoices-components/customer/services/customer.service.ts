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
    return this.httpClient.post('/api/Customers', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateCustomer(formData: CustomerModel) {
    const customerId = formData.id;
    return this.httpClient.put(`/api/Customers/${customerId}`, formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteCustomer(customerId: number) {
    return this.httpClient.delete(`/api/Customers/${customerId}`);
  }




}
