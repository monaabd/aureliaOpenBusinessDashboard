import { ApiHelper } from './api-helper';

export class ApiBase {
  http = null;
  interceptor = null;
  apiHelper = null;

  constructor(httpClient, interceptor = null) {
    this.http = httpClient;
    this.interceptor = interceptor;
    this.apiHelper = new ApiHelper();
  }

  get(baseUrl, parameters) {
    let url = this.apiHelper.createUrl(baseUrl, parameters);
    let requestBuilder = this.http.createRequest(url);
    if (this.interceptor) {
      requestBuilder.withInterceptor(this.interceptor);
    }
    return requestBuilder.asGet().send();
  }

  post(url, content) {
    let requestBuilder = this.http.createRequest(url);
    if (this.interceptor) {
      requestBuilder.withInterceptor(this.interceptor);
    }
    return requestBuilder.asPost().withContent(content).send();
  }

  put(url, content) {
    let requestBuilder = this.http.createRequest(url);
    if (this.interceptor) {
      requestBuilder.withInterceptor(this.interceptor);
    }
    return requestBuilder.asPut().withContent(content).send();
  }

  patch(url, content) {
    let requestBuilder = this.http.createRequest(url);
    if (this.interceptor) {
      requestBuilder.withInterceptor(this.interceptor);
    }
    return requestBuilder.asPatch().withContent(content).send();
  }
}
