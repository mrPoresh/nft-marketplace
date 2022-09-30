import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-main',
  templateUrl: './transaction-main.component.html',
  styleUrls: ['./transaction-main.component.scss']
})
export class TransactionMainComponent implements OnInit {

  public isExtend = false;

  constructor() { }

  ngOnInit() {
    if (window.screen.width > 450) {
      this.isExtend = true;
    }
    
  }

}
