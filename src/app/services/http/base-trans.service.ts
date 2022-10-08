import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseTransService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http)
  }
}
