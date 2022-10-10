import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export const TEST_TRANS_API: string = '/trans/test_trans';
export const GET_TRANS: string = '/trans/get'
export const UPDATE_TRANS: string = '/trans/update'


@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  apiUrl = 'http://0.0.0.0:8000';

  constructor(private http: HttpClient) { }

  /* protected */ get<T>(url: string) {
    return this.http.get<T>(this.apiUrl + url);
  }

  getRequestParam<T>(url: string, paramsValues: any[]) {
    let options = new HttpParams();

    paramsValues.forEach((item) => {
      let paramName = Object.keys(item)[0]
      let paramValue = Object.values(item)[0]

      options = options.append(paramName as string, paramValue as string)
    })
    
    return this.http.get<T>(this.apiUrl + url, { params: options });
  }

}
