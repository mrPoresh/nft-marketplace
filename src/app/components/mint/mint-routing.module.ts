import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MintStartComponent } from './mint-start/mint-start.component';
import { MintEthComponent } from './mint-eth/mint-eth.component';
import { MintErc1155Component } from './mint-erc1155/mint-erc1155.component';
import { MintErc721Component } from './mint-erc721/mint-erc721.component';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'},
  { path: 'start', component: MintStartComponent, children: [
    /* { path: 'solana', component:  }, */
    /* { path: 'tezos', component:  }, */
    /* { path: 'flow', component:  }, */
    /* { path: 'polygon', component:  }, */
  ]},
  { path: 'start/ethereum', component: MintEthComponent },
  { path: 'erc-1155', component: MintErc1155Component },
  { path: 'erc-721', component: MintErc721Component },
  { path: '**', redirectTo: 'start'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MintRoutingModule { }
