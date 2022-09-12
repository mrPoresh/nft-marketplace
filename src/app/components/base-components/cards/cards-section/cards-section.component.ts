import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


import { Section } from 'src/app/components/main/home-page/home-page.component';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss']
})
export class CardsSectionComponent implements OnInit {

  @Input() section!: Section;
  @Output() _data = new EventEmitter<any>();

  collection_id: string | undefined = undefined;

  constructor(
    private router: Router,
  ) { 

  }

  ngOnInit() { 
    
  }

  onClick(data: any) {
    this._data.emit(data);
  }

  navigateCollection() {
    if (this.section.data) {
      this.router.navigate(['collection' + '/' + this.section.data[0].collection]);
    }
  }

}
