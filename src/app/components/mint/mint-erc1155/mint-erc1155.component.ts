import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, takeUntil, map } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';
import { UserWalletAddress } from 'src/app/services/auth/login/login.models';

import { SDKMain } from 'src/app/services/rarible-sdk-services/sdk-main.service';
import { LoginStatusService } from 'src/app/services/auth/login/login-status.service';
import { WindowProviderService } from 'src/app/utils/window-provider.service';
import { SdkLoginService } from 'src/app/services/rarible-sdk-services/sdk-login.service';
import { PinataService } from 'src/app/services/ipfs/pinata.service';

import { PreprocessMetaRequest } from '@rarible/sdk/build/types/nft/mint/preprocess-meta';
import { CommonTokenMetadata } from '@rarible/sdk/build/types/nft/mint/preprocess-meta';
import { Blockchain } from "@rarible/api-client/build/models";
import { TokenMetadataAttribute } from '@rarible/sdk/build/types/nft/mint/preprocess-meta';

class ImageSnippet {
  constructor(public src: string | ArrayBuffer, public file: File) {}
}

@Component({
  selector: 'app-mint-erc1155',
  templateUrl: './mint-erc1155.component.html',
  styleUrls: ['./mint-erc1155.component.scss']
})
export class MintErc1155Component extends BasePageComponent implements OnInit {

  public metadataForm = this.formBuilder.group({
    nftname: ['', [Validators.required]],
    description: ['', Validators.required],
    file: [null],
    fileName: [''],
  });

  public user_address = '';

  public pre_nft: ImageSnippet | null = null;
  public isSale = false;
  public saleOption = 0;

  public collections;

  constructor(
    public router: Router,
    public sdk: SDKMain,
    public loginService: SdkLoginService,
    public loginStatusService: LoginStatusService,
    public ipfs: PinataService,
    public formBuilder: FormBuilder,
  ) { 
    super()
  }

  ngOnInit() {
    
    this.loginStatusService.getLoginStatus().pipe(  //  load list of users collections
      takeUntil(this.unsubscribe),
      switchMap((res) => {
        if (res.walletAddress) {
          return this.sdk.getCollectionsByOwner('ETHEREUM:' + res.walletAddress[0])
        } else {
          return ''
        }
      }),
    ).subscribe((res) => {
      console.log('collections', res);
    });

    this.loginStatusService.getLoginStatus().subscribe((res) => {   /* rebuild */
      if (res.walletAddress) {
        this.user_address = 'ETHEREUM:' + res.walletAddress;
        console.log('adr', this.user_address)
      }
    });

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
    const file = (event.target as HTMLInputElement).files![0];

    this.metadataForm.patchValue({
      fileName: file.name
    })

    this.metadataForm.patchValue({
      file: file
    })

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', (event) => {
        if ((event.target != null) && (event.target.result != (undefined || null))) {
          this.pre_nft = new ImageSnippet(event.target.result, file);

        }

      });

      reader.readAsDataURL(file);

    }

  }

  changeSaleOption(value: number) {
    this.saleOption = value;
    console.log("saleOption", this.saleOption);
  }

  toggle(event) {
    this.isSale = event.checked;
  }

  onSubmit(metadataForm) {
    this.ipfs.postImage(metadataForm).pipe(
      map((res: any) => 'ipfs://' + res.IpfsHash),
      switchMap((res: any) => this.ipfs.postFile(res, this.metadataForm)),
      switchMap((res: any) => this.sdk.mintOffChain('ipfs://' + res.IpfsHash, this.user_address))
    ).subscribe((res) => console.log("Final", res));
  }

  createMetatdata(metadataForm) {
/*     const meta: PreprocessMetaRequest = {
      blockchain: Blockchain.ETHEREUM,
      name: metadataForm.value.nftname,
      description: metadataForm.value.description,
      image: metadataForm.value.file,
      animation: undefined,
      external: undefined,
      attributes: [],
    }
    return this.sdk.raribleSdk.nft.preprocessMeta(meta) */
  }

}
