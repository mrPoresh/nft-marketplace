import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const TEST_TRANS_API: string = '/trans/test_trans';
export const GET_TRANS: string = '/trans/get'

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  apiUrl = 'http://0.0.0.0:8000';

  constructor(private http: HttpClient) { }

  protected get<T>(url: string) {
    return this.http.get<T>(this.apiUrl + url);
  }

  protected getRequest<T>(url: string, formGroup: FormGroup) {
    return this.http.get<T>(this.apiUrl + url, { params: formGroup.value });
  }

  /* protected */ getRequestParam<T>(url: string, paramName: string, paramValue: string) {
    const options = { params: new HttpParams().set(paramName, paramValue) };
    return this.http.get<T>(this.apiUrl + url, options);
  }

}
