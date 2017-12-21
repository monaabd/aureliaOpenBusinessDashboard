import { ApiBase } from './../api-base';
import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { CustomerInvoiceEntity } from './customer-invoice-entity';
import { ListResult } from './../list-result';

@inject(HttpClient)
export class CustomerInvoiceApi extends ApiBase {
  _baseUrl = 'api/customerinvoices';
  constructor(httpClient) {
    super(httpClient);
  }

  async list(searchText, stateList, startDate, endDate, page, pageSize, sort, dateTypeFilter, secondarySortPropertyEnumValue = 2, secondarySortOrderEnumValue = 1, embed = 'CustomerInvoiceReferences', extendedSearch) {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    let parameters = {
      searchText: searchText || '',
      states: stateList || '',
      startDate: startDate,
      endDate: endDate,
      page: page || 0,
      pageSize: pageSize || 0,
      sort: sort || '',
      dateTypeFilter: dateTypeFilter || 1,
      secondarySortPropertyEnumValue: secondarySortPropertyEnumValue || 2,
      secondarySortOrderEnumValue: secondarySortOrderEnumValue || 1,
      embed: embed,
      extendedSearch: extendedSearch || false
    };
    let response = await super.get(this._baseUrl, parameters);
    let listResult = new ListResult(CustomerInvoiceEntity.fromDtoArray(response.content), response.headers.get('x-pagination-total-count'));
    return listResult;
  }

  get(id) {
    let parameters = {
      embed: ['InvoiceLines', 'RutRot.RutRotWorkTypeLines', 'RutRot.RutRotApplicants']
    };
    let url = `${this._baseUrl}/${id}`;
    return super.get(url, parameters)
      .then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  add(entity) {
    let dtoEntity = entity.toDto();
    return this.http.post(this._baseUrl + '/', dtoEntity)
      .then(response => CustomerInvoiceEntity.fromDto(response.content)).catch(x => {
        console.log('Failed to post the customer invoice', x);
      });
  }

  update(entity) {
    let url = `${this._baseUrl}/${entity.id}`;

    return this.http.put(url, entity.toDto())
      .then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  delete(id) {
    let url = `${this._baseUrl}/${id}`;
    return this.http.delete(url);
  }
  bill(id) {
    let url = `${this._baseUrl}/${id}/Bill`;
    return this.http.put(url);
  }
  copy(id) {
    let url = `${this._baseUrl}/${id}/copy`;
    return this.http.get(url)
      .then(response => CustomerInvoiceEntity.fromDto(response.content));
  }
  cancel(id, cancelInvoiceId) {
    let url = `${this._baseUrl}/${id}/bill?cancelInvoiceId=${cancelInvoiceId}`;
    return this.http.put(url);
  }
  getCancellationInvoice(id) {
    let url = `${this._baseUrl}/${id}/cancel`;
    return this.http.get(url)
      .then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  remind(id) {
    let url = `${this._baseUrl}/${id}/Remind`;
    return this.http.put(url).then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  remind(id, reminderText) {
    let url = `${this._baseUrl}/${id}/Remind?reminderText=${reminderText}`;

    return this.http.put(url).then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  closeRutRot(id, reminderText) {
    let url = `${this._baseUrl}/${id}/closeRutRot?reminderText=${reminderText}`;
    return this.http.put(url).then(response => CustomerInvoiceEntity.fromDto(response.content));
  }

  async getByInvoiceNumberAndAmountAndTimeSpan(invoiceNumbers, amount, fromDate, toDate, stateFilter) {
    let param = {
      invoiceNumbers,
      amount,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      stateFilter: stateFilter
    };
    let response = await super.get(`${this._baseUrl}/search`, param);
    return CustomerInvoiceEntity.fromDto(response.content);
  }
}
