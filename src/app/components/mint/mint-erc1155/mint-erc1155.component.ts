import { Component, OnInit } from '@angular/core';

import { BasePageComponent } from '../../base-components/base-page/base-page.component';

class ImageSnippet {
  constructor(public src: string | ArrayBuffer, public file: File) {}
}

@Component({
  selector: 'app-mint-erc1155',
  templateUrl: './mint-erc1155.component.html',
  styleUrls: ['./mint-erc1155.component.scss']
})
export class MintErc1155Component extends BasePageComponent implements OnInit {

  public pre_nft: ImageSnippet | null  = null;
  public isSale = false;

  constructor() { 
    super()
  }

  ngOnInit() {

  }

  onFileSelected(event) {
    const file = event.target.files[0];

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

  toggle(event) {
    this.isSale = event.checked;
  }

}
