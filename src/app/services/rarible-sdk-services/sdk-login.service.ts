import { Injectable } from '@angular/core';

import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SDKMain } from './sdk-main.service';

import { Web3Ethereum } from "@rarible/web3-ethereum";
import { EthereumWallet } from "@rarible/sdk-wallet";

import Web3 from 'web3';
import { Connector, InjectedWeb3ConnectionProvider, DappType, IConnectorStateProvider, AbstractConnectionProvider, EthereumProviderConnectionResult, ConnectionProvider } from "@rarible/connector"
import { WalletConnectConnectionProvider } from "@rarible/connector-walletconnect"
import { mapEthereumWallet, mapFlowWallet, mapTezosWallet } from "@rarible/connector-helper"
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SdkLoginService extends SDKMain {

  private connector;

  private state: IConnectorStateProvider = {
    async getValue(): Promise<string | undefined> {
      const value = localStorage.getItem("saved_provider");
      return value ? value : undefined;
    },
    async setValue(value: string | undefined): Promise<void> {
      localStorage.setItem("saved_provider", value || "")
    },
  }

  constructor() { 
    super();
  }

  getState(): Observable<string | undefined> {
    return from(this.state.getValue());
  }

  getConnector() {
    return this.connector;
  }

  getConenctionOptions(): Observable<any> {
    return from(this.connector.getOptions());
  }

  metamaskInstance() {
    return this.mapEthereumWallet(new InjectedWeb3ConnectionProvider());
  }

  walletConnectInstance() {
    return this.mapEthereumWallet(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));
  }

  mapEthereumWallet<O>(provider: AbstractConnectionProvider<O, EthereumProviderConnectionResult>) {
    return provider.map(state => ({
        wallet: new EthereumWallet(new Web3Ethereum({ web3: new Web3(state.provider), from: state.address })),   // problem here
        address: state.address
    }))
  }

  createConnector() {
    this.connector = Connector.create(this.metamaskInstance(), this.state).add(this.walletConnectInstance());
  }

  getConnection() {
    return this.connector.connection
  }

  async loginWithWallet(option: any) {
    this.state.setValue(this.connector.provider);
    await this.connector.connect(option);
  }

  logOut() {
    this.state.setValue(undefined);
    this.connector.connection.subscribe((con) => {
      if (con.status === "connected") {
        con.disconnect();
      }
    });
  }

}

/* export class SdkLoginService extends SDKMain {

  public connector;

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


    const injected = mapEthereumWallet(new InjectedWeb3ConnectionProvider());
    const walletConnect = mapEthereumWallet(new WalletConnectConnectionProvider({
      rpc: {
        1: "https://node-mainnet.rarible.com"
      },
      chainId: 1
    }));

    this.connector = Connector.create(injected, this.state).add(walletConnect);

    this.connector.connection.subscribe((con) => {
      console.log("Connection in Constructor >>>", con);
      if (con.status === "connected") {
        this.initSDKwithProvider(con.connection.wallet);
      }
    });

  }

  getState() {
    return from(this.state.getValue())
  }

  getConenctionOptions(): Observable<any> {
    return from(this.connector.getOptions());
  }

  async loginWithWallet(option: any) {
    this.state.setValue(this.connector.provider);
    await this.connector.connect(option);
  }

  logOut() {
    this.state.setValue(undefined);
    this.connector.connection.subscribe((con) => {
      if (con.status === "connected") {
        con.disconnect();
        console.log('Disconecting...');
      }
    });
  }

} */
