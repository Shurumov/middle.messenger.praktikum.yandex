enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Необязательный метод
function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type OptionsRequest = {
  timeout?: number;
  method: METHODS;
  headers: Record<string, string>
  data?: Document | BodyInit | null;
}

type OptionsMethod = Omit<OptionsRequest, 'timeout'>

class HTTPTransport {
  get = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.GET
    }, options.timeout);
  };

  post = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.POST
    }, options.timeout);
  };

  put = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.PUT
    }, options.timeout);
  };

  delete = (url: string, options: OptionsRequest) => {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE
    }, options.timeout);
  };

  private request = (url: string, options: OptionsMethod, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && Boolean(data)
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export const fetcher = new HTTPTransport();
