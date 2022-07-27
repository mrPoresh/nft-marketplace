/* import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import Web3 from "web3";
import { Web3Ethereum } from "@rarible/web3-ethereum"
import { EthereumWallet } from "@rarible/sdk-wallet"
import { createRaribleSdk, IRaribleSdk } from "@rarible/sdk"
import { toUnionAddress } from "@rarible/types"
import type { EthEthereumAssetType } from "@rarible/api-client"

import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { PrepareSellResponse } from '@rarible/sdk/build/types/order/sell/domain';

@Injectable({
  providedIn: 'root'
})
export class AlchemyMainService {
  ethereum: any;

  public raribleSdk!: IRaribleSdk;

  constructor(
    private winRef: WindowProviderService,
  ) {
    this.ethereum = winRef.window.ethereum;
  }

  async init() {
    if (this.ethereum) {
      await this.ethereum.request({ method: "eth_requestAccounts"});  // unlock metamask
      console.log('ethereum ->', this.ethereum);

      const web3 = new Web3(this.ethereum);   // init web3
      console.log("web3 ->", web3);

      const web3Ethereum = new Web3Ethereum({ web3 });
      console.log("web3Ethereum ->", web3Ethereum);

      const ethWallet = new EthereumWallet(web3Ethereum);
      console.log("ethWallet ->", ethWallet);

      this.raribleSdk = createRaribleSdk(ethWallet, "prod"); // Second parameter — is environment: "prod" | "staging" | "dev"
      console.log("raribleSdk ->", this.raribleSdk);
      
    } else {
      this.winRef.window.alert("Need Metamsk");

    }

  }

  getBalance() {
    return from(this.raribleSdk.balances.getBalance(
      toUnionAddress("ETHEREUM:" + this.ethereum.selectedAddress),
      {
        "@type": "ETH"
      }
    ))
  }

}
 */