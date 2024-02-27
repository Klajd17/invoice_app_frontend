export class InvoiceModel {
  constructor(
    public id: number = 0,
    public invoiceDate: Date | null = null,
    public invoiceNumber: string = "",
    public customerId: number = 0,
    public totalAmount: number = 0,
    public totalVatAmount: number = 0,
    public totalDiscountAmount: number = 0,
    public isPaid: boolean = false,
    public notes: string = "",
    public createdAt: Date | null = null,
    public updatedAt: Date | null = null,
    public user: string = "",
    public invoiceLines: InvoiceLineModel[] = [],
    public totalWoVat: number = 0
  ) {}
}

export class InvoiceLineModel {
  constructor(
    public id: number = 0,
    public invoiceId: number = 0,
    public itemId: number = 0,
    public itemName: string = "",
    public itemCode: string = "",
    public vatRate: number = 0,
    public quantity: number = 0,
    public uom: string = "",
    public unitPrice: number = 0,
    public lineTotal: number = 0,
    public discountPercent: number = 0,
    public discountTotalAmount: number = 0,
    public totalAfterDiscount: number = 0,
    public notes: string = "",
    public taxAmount: number = 0,
    public totalIncludingTax: number = 0
  ) {}
}
