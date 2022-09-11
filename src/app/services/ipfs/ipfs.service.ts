import { InjectionToken } from '@angular/core';
import IpfsHttpClient from 'ipfs-http-client';

export const ipfsToken = new InjectionToken('The IPFS Token', {
  providedIn: 'root',
  factory: () => {
    let contextClass : any = IpfsHttpClient;
    let context: IpfsHttpClient.IPFSHTTPClient = new contextClass.create('ipfs.infura.io', '5001', {
        protocol: 'https'
      });

    try {
        console.log("IPFS");
        
      return context;
    } catch (err) {
      console.log('Error', err);
      throw new Error('Unable to access IPFS node daemon on Infura network');
    }
  }
});