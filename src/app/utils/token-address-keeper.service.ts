import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenAddressKeeperService {

  private token_address = new BehaviorSubject<string>('');

  constructor() { }

  updateTokenAddress(next_address: string) {
    this.token_address.next(next_address)
  }

  getTokenAddress(): Observable<string> {
    return this.token_address.asObservable()
  }

}
