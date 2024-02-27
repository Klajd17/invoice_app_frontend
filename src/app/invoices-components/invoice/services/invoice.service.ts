import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {InvoiceModel} from "../models/invoice-model";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  url = environment.API_HOST;
  constructor(private httpClient:HttpClient) { }

  getInvoices(): Observable<InvoiceModel[]> {
    return this.httpClient.get<InvoiceModel[]>('/api/Invoices');
  }

  addInvoice(data: InvoiceModel) {
    return this.httpClient.post('/api/Invoices', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateInvoice(formData: InvoiceModel) {
    const invoiceId = formData.id;
    return this.httpClient.put(`/api/Invoices/${invoiceId}`, formData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteInvoice(invoiceId: number) {
    return this.httpClient.delete(`/api/Invoices/${invoiceId}`);
  }
}
