import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { Section } from 'src/app/components/main/home-page/home-page.component';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss']
})
export class CardsSectionComponent implements OnInit {

  @Input() section!: Section;
  @Input() isFull!: boolean;
  @Output() _data = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  onClick(data: any) {
    this._data.emit(data);
  }

}
