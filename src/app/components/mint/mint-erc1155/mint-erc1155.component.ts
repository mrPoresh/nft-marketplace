import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { UserWalletAddress } from 'src/app/services/auth/login/login.models';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';
import { IpfsDaemonService } from 'src/app/services/ipfs/ipfs-deamon.service';
import { ipfsToken } from 'src/app/services/ipfs/ipfs.service';

class ImageSnippet {
  constructor(public src: string | ArrayBuffer, public file: File) {}
}

@Component({
  selector: 'app-mint-erc1155',
  templateUrl: './mint-erc1155.component.html',
  styleUrls: ['./mint-erc1155.component.scss']
})
export class MintErc1155Component extends BasePageComponent implements OnInit {

  public pre_nft: ImageSnippet | null = null;
  public isSale = false;
  public saleOption = 0;

  public collections;

  constructor(
    public router: Router,
    public sdk: SDKMain,
    public loginService: SdkLoginService,
    public loginStatusService: LoginStatusService,
    @Inject(ipfsToken) private ipfs,
  ) { 
    super()
  }

  ngOnInit() {
    this.sdk.initSDKwiithOutProvider();
    
    this.loginStatusService.getLoginStatus().pipe(  //  load list of users collections
      takeUntil(this.unsubscribe),
      switchMap((res) => {
        if (res.walletAddress) {
          return this.sdk.getCollectionsByOwner('ETHEREUM:' + res.walletAddress[0])
        } else {
          return ''
        }
      }),
    ).subscribe((res) => console.log('collections', res));

    this.loginService.getConnection().subscribe((res) => {
      if (res.status === "connected") {
        console.log("Init Provider with Wallet", res)
        this.sdk.initSDKwithProvider(res.connection.wallet);
      } else {
        console.log("Wait Connection", res);
      }
    });

  }

  onFileSelected(event) {
    const file = event.target.files[0];

    console.log('File', file)

    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        if ((event.target != null) && (event.target.result != (undefined || null))) {
          this.pre_nft = new ImageSnippet(event.target.result, file);
        }
      });

      reader.readAsDataURL(file);

      //this.ipfs.addFile(file);

    }

  }

  changeSaleOption(value: number) {
    this.saleOption = value;
    console.log("saleOption", this.saleOption);
  }

  toggle(event) {
    this.isSale = event.checked;
  }

  createCollection() {
/*     const asset = {
      assetType: "ERC1155",
      arguments: {
        name: "Cats live style",
        symbol: "CHEW",
        contractURI: "https://ipfs.moralis.io:2053/ipfs/QmX9hZ6tGASkCs4bappwUJ3sRsf6V2VXMrg3iPmw6t5RR1",
        baseURI: "https://ipfs.rarible.com",
        isUserToken: false,
      },
    };
    this.sdk.createCollection(asset).pipe(takeUntil(this.unsubscribe)).subscribe((res) => console.log('Created Collection', res)) */
  }

}
