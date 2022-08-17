import { Injectable } from '@angular/core';

import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { RaribleSDKMain } from './rarible-sdk-main.service';

import { Web3Ethereum } from "@rarible/web3-ethereum";
import { EthereumWallet } from "@rarible/sdk-wallet";

import { Connector, InjectedWeb3ConnectionProvider, DappType, IConnectorStateProvider } from "@rarible/connector"
import { WalletConnectConnectionProvider } from "@rarible/connector-walletconnect"
import { mapEthereumWallet, mapFlowWallet, mapTezosWallet } from "@rarible/connector-helper"
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdkLoginService extends RaribleSDKMain {

  public connector; /*  */

  constructor(
    public winRef: WindowProviderService
  ) { 
    super(winRef);

    const injected = mapEthereumWallet(new InjectedWeb3ConnectionProvider());
    const walletConnect = mapEthereumWallet(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));

    this.connector = Connector.create(injected).add(walletConnect);

  }

  getConenctionOptions(): Observable<any> {
    return from(this.connector.getOptions());
  }

  async loginWithWallet(option: any) {

    this.connector.connection.subscribe((con) => {
      console.log("Status in fn >>> ", con);
      if (con.status === "connected") {
        this.initSDKwithProvider(con.connection.wallet);
        /* this.getBalance("ETHEREUM:" + con.connection.address).subscribe((res) => console.log("Balance", res.toString())); */
        
      }
    });

    await this.connector.connect(option);
  }

  logOut() {
    this.connector.connection.subscribe((con) => {
      if (con.status === "connected") {
        con.disconnect();
        console.log('Disconecting...');
      }
    });
  }

}
