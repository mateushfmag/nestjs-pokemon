import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpRequest {
  constructor(private baseUrl: string) {}

  public request<T>(path: string, init?: RequestInit) {
    return fetch(`${this.baseUrl}/${path}`, init).then((response) =>
      response.json(),
    ) as Promise<T>;
  }
}
