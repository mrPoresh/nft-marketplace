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

  public state: IConnectorStateProvider = {
    async getValue(): Promise<string | undefined> {
      const value = localStorage.getItem("saved_provider");
      return value ? value : undefined;
    },
    async setValue(value: string | undefined): Promise<void> {
      localStorage.setItem("saved_provider", value || "")
    },
  }

  constructor(
    public winRef: WindowProviderService
  ) { 
    super(winRef);

    /* Create Provders For Connection */
    const injected = mapEthereumWallet(new InjectedWeb3ConnectionProvider());       /* Metamask */
    const walletConnect = mapEthereumWallet(new WalletConnectConnectionProvider({   /* Wallet Connect */
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));

    /* Create Connection which contains all connection info */
    this.connector = Connector.create(injected, this.state).add(walletConnect);

    this.connector.connection.subscribe((con) => {
      console.log("Connection in Constructor >>>", con);
      if (con.status === "connected") {
        this.initSDKwithProvider(con.connection.wallet);
      }
    });

  }

  getConenctionOptions(): Observable<any> {
    return from(this.connector.getOptions());
  }

  /* auth */

  async loginWithWallet(option: any) {
    this.state.setValue(this.connector.provider);
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

  /*  */

}
