//import { CustomerInvoiceEntity } from '../../apis/customer-invoice/customer-invoice-entity';
import { CustomerInvoiceApi } from '../../../apis/customer-invoice/customer-invoice-api';
import { SupplierInvoiceApi } from '../../../apis/supplier-invoice/supplier-invoice-api';
import { DatePart } from 'date-part';
import { inject, bindable } from 'aurelia-framework';
import './dashboard-overview';
import { BankAccountTransactionApi } from '../../../apis/bank-account-transaction/bank-account-transaction-api';
import { FinancialYearContext } from '../../../contexts/financial-year-context';
import { Router } from 'aurelia-router';
@inject(Router, CustomerInvoiceApi, SupplierInvoiceApi, BankAccountTransactionApi, FinancialYearContext)


export class DashboardOverview {
  @bindable viewModel;
  constructor(router, customerInvoiceApi, supplierInvoiceApi, bankAccountTransactionApi, financialYearContext) {
    this.router = router;
    this._customerInvoiceApi = customerInvoiceApi;
    this._supplierInvoiceApi = supplierInvoiceApi;
    this._startDate = new DatePart('2000-01-01');
    this._endDate = new DatePart('2100-01-01');
    this._customerInvoicePage = 0;
    this._supplierInvoicePage = 0;
    this.totalCountOfCustomerExpiredInvoices = 0;
    this.totalCountOfSupplierExpiredInvoices = 0;
    this.totalAmountLeftToPayCustomer = 0;
    this.totalAmountLeftToPaySupplier = 0;

    this.bankTallying = 0;
    this._bankAccountTransactionApi = bankAccountTransactionApi;
    this.bankTayllingAccountNumber = '';
    //this._financialYearApi = financialYearApi;
    this.financialYearContext = financialYearContext;
    this.financialYear = this.financialYearContext.getFinancialYear();
    this.startDateFinancialYear = this.financialYear.startDate;
    this.endDateFinancialYear = this.financialYear.endDate;
  }

  attached() {
    this.loadExpiredCustomerInvoices();
    this.loadExpiredSupplierInvoices();
    this.loadbankTallying();
  }


  async  loadExpiredCustomerInvoices() {
    this._customerInvoiceApi.list('', [50], this._startDate, this._endDate, this._customerInvoicePage, 0, 0, '', 1, 2, 1, null, false).then(response => {
      console.log('RESPONSE CustomerExpiredInvoices', response.totalCount);
      this.totalCountOfCustomerExpiredInvoices = response.totalCount;
      response.items.forEach(element => {
        //item is each invoice
        console.log('Item Response', response);
        this.totalAmountLeftToPayCustomer += element.amountLeftToPay;
      });
    });
  }//getExpired

  loadExpiredSupplierInvoices() {
    let supplierInvoiceParameters = {
      searchText: '',
      statusFilter: [50],
      startDate: this._startDate,
      endDate: this._endDate,
      page: this._supplierInvoicePage,
      pageSize: 5,
      sort: '',
      dateTypeFilter: 1,
      embed: []
    };
    this._supplierInvoiceApi.list(supplierInvoiceParameters).then(response => {
      console.log('Response SupplierExpiredInvoices', response.totalCount);
      this.totalCountOfSupplierExpiredInvoices = response.totalCount;
      response.items.forEach(element => {
        this.totalAmountLeftToPaySupplier += element.amountLeftToPay;
      });
    });
  }//load expiredSupplier
  loadbankTallying() {
    this._bankAccountTransactionApi.getByBankAccountNumber('', this.startDateFinancialYear, this.endDateFinancialYear, [0], 1, 500, '').then(response => {
      console.log('Response bankaccountTransaction', response);
      this.bankTallying = response.transactions.length;
      response.transactions.forEach(element => {
        this.bankTayllingAccountNumber = element.bankAccountNumber;
      });
    });
  }
}
