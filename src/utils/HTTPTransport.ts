import { ENDPOINTS } from '../api/endpoints';
import { Options } from '../types/types';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export default class HTTPTransport {
  private _pathname = '';

  constructor(url: string) {
    this._pathname = ENDPOINTS.ROOT + url;
  }

  get = (url: string, options?: Options) => {
    const request = this.request(url, { ...options, method: METHODS.GET }, options?.timeout);
    return request;
  };

  post = (url: string, options?: Options) => {
    const request = this.request(url, { ...options, method: METHODS.POST }, options?.timeout);
    return request;
  };

  put = (url: string, options?: Options) => {
    const request = this.request(url, { ...options, method: METHODS.PUT }, options?.timeout);
    return request;
  };

  delete = (url: string, options?: Options) => {
    const request = this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout);
    return request;
  };

  private queryStringify(data: Record<string, any>) {
    return `?${Object.keys(data).reduce<string[]>((arr, key) => {
      arr.push(`${key}=${data[key]}`);
      return arr;
    }, []).join('&')}`;
  }

  private request = (url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = { 'Content-Type': 'application/json' }, method, data } = options;
    const path = this._pathname + url;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      const isGet = (method === METHODS.GET);

      xhr.open(
        method!,
        isGet && data
          ? `${path}${this.queryStringify(data)}`
          : path,
      );

      if (headers != null) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr);
        } else {
          reject(JSON.parse(xhr.responseText));
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        // @ts-ignore
        xhr.send(options.isRawData ? data : JSON.stringify(data));
      }
    });
  };
}
