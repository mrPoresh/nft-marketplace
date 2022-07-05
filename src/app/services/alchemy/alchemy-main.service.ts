import { Injectable } from '@angular/core';
import { Alchemy, getNftMetadata, getNftsForCollection, getNftsForOwner, initializeAlchemy, Network } from '@alch/alchemy-sdk'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlchemyMainService {

  public alchemy!: Alchemy;

  constructor() { }

  async init() {
    this.alchemy = initializeAlchemy({
      apiKey: environment.alchemy.apiKey,
      network: Network.ETH_RINKEBY,
    });
    
  }

}
