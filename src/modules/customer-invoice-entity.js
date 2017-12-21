import {CurrencyEntity} from './currency-entity';
import {InvoiceLineEntity} from './invoice-line-entity';
import {InvoiceHeaderEntity} from './invoice-header-entity';
import {RutRotEntity} from './rut-rot-entity';
import {EntityBase} from './entity-base';

export class CustomerInvoiceEntity extends EntityBase {
  id = null;
  version = null;
  isClosed = undefined;
  isBilled = undefined;
  isExpired = undefined;
  netAmount = undefined;
  vatAmount = undefined;
  grossAmount = undefined;
  invoiceLines = [];
  currency = null;
  invoiceHeader = null;
  state = null;
  paymentChannels = [];
  customerDebtAccountNumber = null;
  amountLeftToPay = null;
  amountPaid = null;
  customerInvoiceState = 1;
  defaultPaymentTerms = null;
  copy = false;
  rutRot = undefined;
  isCanceled = false;
  isReverseCharge = false;
  customerInvoiceReferences = [];
  projectId = undefined;
  dimensionIds = [];
  constructor() {
    super();
    this.rutRot = new RutRotEntity();
  }

  static fromDtoArray(dtoArray) {
    return dtoArray.select((x) => this.fromDto(x));
  }

  static fromDto(dto) {
    let entity = new CustomerInvoiceEntity();
    entity.id = dto.id;
    entity.isClosed = dto.isClosed;
    entity.isBilled = dto.isBilled;
    entity.isExpired = dto.isExpired;
    entity.netAmount = dto.netAmount;
    entity.vatAmount = dto.vatAmount;
    entity.grossAmount = dto.grossAmount;
    entity.invoiceLines = InvoiceLineEntity.fromDtoArray(dto.invoiceLines);
    entity.currency = CurrencyEntity.fromDto(dto.currency);
    entity.invoiceHeader = InvoiceHeaderEntity.fromDto(dto.invoiceHeader);
    entity.customerDebtAccountNumber = dto.customerDebtAccountNumber;
    entity.amountLeftToPay = dto.amountLeftToPay;
    entity.amountPaid = dto.amountPaid;
    entity.customerInvoiceState = dto.customerInvoiceState;
    entity.rutRot = RutRotEntity.fromDto(dto.rutRot);
    entity.version = dto.version;
    entity.isCanceled = dto.isCanceled;
    entity.isReverseCharge = dto.isReverseCharge;
    entity.customerInvoiceReferences = dto.customerInvoiceReferences;
    entity.reminderCount = dto.reminderCount;
    entity.isCustomerPaid = dto.isCustomerPaid;
    entity.projectId = dto.projectId;
    entity.dimensionIds = dto.dimensionIds;
    return entity;
  }

  toDto() {
    return {
      id: this.id,
      version: this.version,
      isClosed: this.isClosed,
      isBilled: this.isBilled,
      isExpired: this.isExpired,
      netAmount: this.netAmount,
      vatAmount: this.vatAmount,
      grossAmount: this.grossAmount,
      invoiceLines: this.invoiceLines.select(il => il.toDto()),
      currency: this.currency.toDto(),
      invoiceHeader: this.invoiceHeader.toDto(),
      state: this.state,
      paymentChannels: this.paymentChannels,
      customerDebtAccountNumber: this.customerDebtAccountNumber,
      amountLeftToPay: this.amountLeftToPay,
      amountPaid: this.amountPaid,
      customerInvoiceState: this.customerInvoiceState,
      rutRot: this.rutRot.toDto(),
      isCanceled: this.isCanceled,
      isReverseCharge: this.isReverseCharge,
      customerInvoiceReferences: this.customerInvoiceReferences,
      projectId: this.projectId,
      dimensionIds: this.dimensionIds
    };
  }

  static emptyEntity() {
    let entity = new CustomerInvoiceEntity();
    entity.id = '00000000-0000-0000-0000-000000000000';
    entity.version = 0;
    entity.customerDebtAccountNumber = 0;
    entity.amountLeftToPay = 0;
    entity.amountPaid = 0;
    entity.currency = CurrencyEntity.emptyEntity();
    entity.invoiceHeader = InvoiceHeaderEntity.emptyEntity();
    entity.rutRot = RutRotEntity.emptyEntity();
    entity.customerInvoiceReferences = [];
    return entity;
  }

  addInvoiceLine(invoice) {
    this.invoiceLines.push(invoice);
  }
  removeInvoiceLine(index) {
    if (index > -1 && index < this.invoiceLines.length) {
      this.invoiceLines.splice(index, 1);
    }
  }
}
