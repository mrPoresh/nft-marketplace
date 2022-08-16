import { Injectable } from '@angular/core';

import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { RaribleSDKMain } from './rarible-sdk-main.service';

import { Web3Ethereum } from "@rarible/web3-ethereum";
import { EthereumWallet } from "@rarible/sdk-wallet";

import { Connector, InjectedWeb3ConnectionProvider, DappType } from "@rarible/connector"
import { WalletConnectConnectionProvider } from "@rarible/connector-walletconnect"
import { mapEthereumWallet, mapFlowWallet, mapTezosWallet } from "@rarible/connector-helper"

@Injectable({
  providedIn: 'root'
})
export class SdkLoginService extends RaribleSDKMain {

  public connector: any

  constructor(
    public winRef: WindowProviderService
  ) { 
    super(winRef)
  }

  async loginWithMetamask() {
    const injected = mapEthereumWallet(new InjectedWeb3ConnectionProvider());
    const walletConnect = mapEthereumWallet(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));

    this.connector = Connector
      .create(injected)
      .add(walletConnect)

    this.connector.connection.subscribe((con) => {
      console.log("connection: ", con)
      if (con.status === "connected") {
        this.initSDKwithProvider(con.connection.wallet);
        this.getBalance("ETHEREUM:" + con.connection.address).subscribe((res) => console.log("Balance", res));
        
        con.disconnect();
      }
    });

    const options = await this.connector.getOptions(); // get list of available option
    console.log("options", options);
    await this.connector.connect(options[0]); // connect to selected provider
  
  }

}
