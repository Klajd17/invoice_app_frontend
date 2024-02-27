import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import {InvoiceModel} from "../../invoices-components/invoice/models/invoice-model";


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
  async generateInvoicePDF(invoiceData: InvoiceModel) {
    console.log(invoiceData)
    const invoiceHtml = this.constructInvoiceHtml(invoiceData);

    // Append the HTML to the document body
    document.body.appendChild(invoiceHtml);

    // Introduce a slight delay before capturing the content
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(invoiceHtml);

        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('invoice.pdf');

      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        // Remove the appended HTML from the document body
        document.body.removeChild(invoiceHtml);
      }
    }, 100);
  }

  private constructInvoiceHtml(invoiceData: InvoiceModel): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="container">
<div class="row">
        <div class="col-lg-12">
            <div class="card" style="box-shadow: 0 20px 27px 0 rgb(0 0 0 / 5%); position: relative; display: flex; flex-direction: column; min-width: 0; word-wrap: break-word; background-color: #fff; background-clip: border-box; border: 0 solid rgba(0,0,0,.125); border-radius: 1rem;">
                <div class="card-body">
                    <div class="invoice-title">
                        <h4 class="float-end font-size-15">Invoice #DS0204 <span class="badge bg-success font-size-12 ms-2">UnPaid</span></h4>
                        <div class="mb-4">
                           <h2 class="mb-1 text-muted">IVA Elektronik</h2>
                        </div>
                        <div class="text-muted">
                            <p class="mb-1">Test</p>
                            <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i> test.com</p>
                            <p><i class="uil uil-phone me-1"></i> 012-345-6789</p>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="row">
                        <div class="col-sm-6">
                            <div class="text-muted">
                                <h5 class="font-size-16 mb-3">Customer Id:</h5>
                                <h5 class="font-size-15 mb-2"> ${invoiceData.customerId}</h5>
                                <p class="mb-1">4068 Post Avenue Newfolden, MN 56738</p>
                                <p class="mb-1">test@gmail.com</p>
                                <p>001-234-5678</p>
                            </div>
                        </div>
                        <!-- end col -->
                        <div class="col-sm-6">
                            <div class="text-muted text-sm-end">
                                <div>
                                    <h5 class="font-size-15 mb-1">Invoice No:</h5>
                                    <p># ${invoiceData.invoiceNumber}</p>
                                </div>
                                <div class="mt-4">
                                    <h5 class="font-size-15 mb-1">Invoice Date:</h5>
                                    <p> ${invoiceData.invoiceDate}</p>
                                </div>
                                <div class="mt-4">
                                    <h5 class="font-size-15 mb-1">Order No:</h5>
                                    <p>#1123456</p>
                                </div>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->

                    <div class="py-2">
                        <h5 class="font-size-15">Order Summary</h5>

                        <div class="table-responsive">
                            <table class="table align-middle table-nowrap table-centered mb-0">
                    <thead>
                      <tr>
                        <th style="width: 70px;">No.</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th class="text-end" style="width: 120px;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${invoiceData.invoiceLines.map((line, index) => `
                        <tr>
                          <th scope="row">${index + 1}</th>
                          <td>
                            <div>
                              <h5 class="text-truncate font-size-14 mb-1">${line.itemName}</h5>
                              <p class="text-muted mb-0">${line.notes}</p>
                            </div>
                          </td>
                          <td>$ ${line.unitPrice.toFixed(2)}</td>
                          <td>${line.quantity}</td>
                          <td class="text-end">$ ${line.lineTotal}</td>
                        </tr>
                      `).join('')}
                       <tr>
                                        <th scope="row" colspan="4" class="text-end">Sub Total</th>
                                        <td class="text-end">${invoiceData.subTotal}</td>
                                    </tr>
                                    <!-- end tr -->
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">
                                            Discount :</th>
                                        <td class="border-0 text-end">- ${invoiceData.totalDiscountAmount}</td>
                                    </tr>
                                    <!-- end tr -->
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">
                                            Total Vat Amount</th>
                                        <td class="border-0 text-end">${invoiceData.totalVatAmount}</td>
                                    </tr>
                                    <!-- end tr -->
                                    <tr>
                                        <th scope="row" colspan="4" class="border-0 text-end">Total Lek</th>
                                        <td class="border-0 text-end"><h4 class="m-0 fw-semibold">${invoiceData.totalAmount}</h4></td>
                                    </tr>
                    </tbody>
                  </table>
                        </div>
                        <!-- end table responsive -->
                    </div>
                </div>
            </div>
        </div><!-- end col -->
    </div>
</div>
    `;
    return container;
  }
}
