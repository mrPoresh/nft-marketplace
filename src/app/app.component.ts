import { Component, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import { Alchemy, getNftMetadata, getNftsForCollection, getNftsForOwner, initializeAlchemy, Network } from '@alch/alchemy-sdk'
import { MatSidenav } from '@angular/material/sidenav';

import { DetectDeviceService } from './utils/detect-device.service';

import { topMenuAction } from './components/base-components/slide-menu/slide-menu-button/slide-menu-button.component';
import { BasePageComponent } from './components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BasePageComponent implements OnInit {
  title = 'nft-marketplace';

  public isExtend = false;
  public isDesktop = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    public detectDeviceService: DetectDeviceService,
  ) {
    super()
  }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }

    this.isDesktop = this.detectDeviceService.isDesktop();
    console.log(this.isDesktop)
  }

  menuAction(value: topMenuAction) {
    if (value === topMenuAction.TOP) {
      this.sidenav.open();
    }
    else if (value === topMenuAction.BACK) {
      this.sidenav.close();
    }
    
  }

  closeFromMenu() {
    this.sidenav.close();
  }



/*     const settings = {
      apiKey: "ygJ5UrgjjxvHkaUVKIzL6PUqKkNY-20L", // Replace with your Alchemy API Key.
      network: Network.ETH_RINKEBY, // Replace with your network.
    };

    const userAddr = "0x2D260D3c4Af1A42180929De1f639D23ede3328c3";
    const contractAddr = "0x15a9a34d5a698a24727b00c445f013e2c26d4f5d";
    const tokenId = "1239"

    const alchemy = initializeAlchemy(settings); */

/*     this.getNFTs(alchemy, userAddr).subscribe((res) => console.log("Users NFTs ->", res));
    this.getMetadata(alchemy, contractAddr, tokenId).subscribe((res) => console.log("Metadata ->", res)); */
    /* 
     *  This endpoint isn't enabled for that chain or network just yet -> Only for Mainnet, Goerli
     *
      this.getCollection(alchemy, contractAddr, true, 20).subscribe((res) => console.log("Collection ->", res)); 
    */
  

  /* ----- Alchemy SDK ----- */

  /* Get All Nfts owned by addres */
/*   getNFTs(alchemy: Alchemy, address: string) {
    return from(getNftsForOwner(alchemy, address))  // withMetadata: [boolean] - true by def
  } */

  /* Get metadata for nft */
/*   getMetadata(alchemy: Alchemy, address: string, id: string) {
    return from(getNftMetadata(alchemy, address, id))
  } */

  /* Gets all NFTs for a given NFT contract */

/*   getCollection(alchemy: Alchemy, address: string, metadata: boolean, limit: number) {  // startToken: [string]
    const options = { omitMetadata: metadata, limit: limit}
    return from(getNftsForCollection(alchemy, address, options ))
  } */

  /* ----------------------- */

}
