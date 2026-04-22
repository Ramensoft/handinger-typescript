// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Handinger } from '../client';

export abstract class APIResource {
  protected _client: Handinger;

  constructor(client: Handinger) {
    this._client = client;
  }
}
