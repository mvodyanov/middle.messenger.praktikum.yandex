import { Options } from '../types/types';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export default class HTTPTransport {
  get = (url: string, options: Options) => {
    const request = this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    return request;
  };

  post = (url: string, options: Options) => {
    const request = this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    return request;
  };

  put = (url: string, options: Options) => {
    const request = this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    return request;
  };

  delete = (url: string, options: Options) => {
    const request = this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    return request;
  };

  private queryStringify(data: Record<string, any>) {
    return `?${Object.keys(data).reduce<string[]>((arr, key) => {
      arr.push(`${key}=${data[key]}`);
      return arr;
    }, []).join('&')}`;
  }

  private request = (url: string, options: Options, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = (method === METHODS.GET);

      xhr.open(
        method!,
        isGet && data
          ? `${url}${this.queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
