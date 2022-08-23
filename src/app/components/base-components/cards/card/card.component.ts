import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data!: any;
  @Output() _data = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onClick(data: any) {
    this._data.emit(data);
  }

}
