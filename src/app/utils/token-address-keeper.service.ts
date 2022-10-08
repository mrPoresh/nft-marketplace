import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UrlData {
  contract_adr: string,
  token_id: string,
  token_adr: string,
}

@Injectable({
  providedIn: 'root'
})
export class TokenAddressKeeperService {

  private token_address = new BehaviorSubject<UrlData>({
    contract_adr: '',
    token_id: '',
    token_adr: '',
  });

  constructor() { }

  updateTokenAddress(params: any) {
    let current = this.token_address.getValue();
    this.token_address.next({ ...current, ...params });
  }

  getTokenAddress(): Observable<UrlData> {
    return this.token_address.asObservable()
  }

}
