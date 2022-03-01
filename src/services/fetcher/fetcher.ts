import { helpers } from '/src/utils/helpers';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type OptionsRequest = {
  method?: METHODS;
  headers?: Record<string, string>
  data?: any;
  withCredentials?: boolean;
  retries?: number;
  file?: boolean
}


export class Fetcher {
  baseUrl = "https://ya-praktikum.tech/api/v2";
  resourceUrl = "http://ya-praktikum.tech/api/v2/resources";

  get = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.GET
    });
  };

  post = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.POST
    });
  };

  put = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.PUT
    });
  };

  delete = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE
    });
  };


  private request = (url: string, options: OptionsRequest): Promise<any> => {
    let retries = options.retries ?? 0;
    const fullUrl = this.baseUrl + url;

    const { headers, method, data, withCredentials, file } = options;

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();

      const prepareXhr = () => {
        const workUrl =
          method === METHODS.GET && data
            ? `${fullUrl}${helpers.queryStringify(data)}`
            : fullUrl;

        xhr.open(method ?? METHODS.GET, workUrl);
        xhr.withCredentials =
          typeof withCredentials !== "undefined" ? withCredentials : true;

        if (headers) {
          Object.entries(headers).forEach(([key, value]: [string, string]) => {
            xhr.setRequestHeader(key, value);
          });
        }
      };

      const sendXhr = () => {
        if (method === METHODS.GET || !data) {
          try {
            xhr.send();
          } catch (err) {
            console.log("send error: ", err);
          }
        } else {
          xhr.send(!!file ? data : JSON.stringify(data));
        }
      };

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onerror = function (err) {
        if (retries > 0) {
          retries -= 1;
          prepareXhr();
          sendXhr();
        } else {
          throw new Error(err.type);
        }
      };

      xhr.onabort = function () {
        if (retries > 0) {
          retries -= 1;
          prepareXhr();
          sendXhr();
        } else {
          throw new Error();
        }
      };

      xhr.onload = function () {
        if (xhr.status !== 200 && retries && retries > 0) {
          retries -= 1;
          prepareXhr();
          sendXhr();
        } else if (xhr.status === 200) {
          let response = "";

          try {
            response = JSON.parse(xhr.response);
          } catch (err) {}

          resolve(response);
        } else {
          reject(new Error(JSON.parse(xhr.response)?.reason));
        }
      };

      prepareXhr();
      sendXhr();
    }).catch((error) => {
      throw error;
    });
  };
}

export const fetcher = new Fetcher();
