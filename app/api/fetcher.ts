import { ApiClient } from './api';

export const fetcher = <T>(url: string): Promise<T> =>
  ApiClient.get(url).then((res) => {
    return res.data;
  });
