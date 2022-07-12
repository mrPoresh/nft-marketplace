import { Injectable } from '@angular/core';
import { Alchemy, getNftMetadata, getNftsForCollection, getNftsForOwner, initializeAlchemy, Network } from '@alch/alchemy-sdk'
import { AlchemyWeb3, createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3 from "web3";
declare let window: any;

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlchemyMainService {

  public alchemySDK!: Alchemy;
  public alchenyWeb3!: AlchemyWeb3;
  public conf: undefined;

  constructor() { }

  async initSDK() {
    this.alchemySDK = initializeAlchemy({
      apiKey: environment.alchemy.apiKey,
      network: Network.ETH_RINKEBY,
    });
    
  }

  async initWeb3() {
    const alchemyKey = "https://eth-rinkeby.alchemyapi.io/v2/" + environment.alchemy;
    this.alchenyWeb3 = await createAlchemyWeb3(alchemyKey);
  }

  async connectMetamask() {
    const alchemyKey = "https://eth-rinkeby.alchemyapi.io/v2/" + environment.alchemy;
    const msg = "Hello World"
    if (window.ethereum) {
      await window.ethereum.enable().then(async (acc: any) => {
        /* window.ethereum.request({ method: 'eth_sign', params: [acc[0], "hello"] }) */
        this.alchenyWeb3 = await createAlchemyWeb3(alchemyKey);
        /* this.alchenyWeb3.eth.sign(this.alchenyWeb3.utils.sha3("Hello World")!, acc[0]).then(console.log); */
        window.ethereum.request({ method: 'eth_sign', params: [acc[0], this.alchenyWeb3.utils.sha3("Hello World")!] })
      })
    }
  }

}
