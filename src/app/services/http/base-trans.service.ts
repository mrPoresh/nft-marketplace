import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BaseTransService extends BaseHttpService {

  constructor(http: HttpClient) {
    super(http)
  }

  payByBliK(): Observable<boolean> {
    return of(true)
  }

}
