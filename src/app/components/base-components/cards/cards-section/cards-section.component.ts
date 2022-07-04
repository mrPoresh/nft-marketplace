import { Component, OnInit , Input, Output} from '@angular/core';

import { Section } from '../../home-page/home-page.component';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss']
})
export class CardsSectionComponent implements OnInit {

  @Input() section!: Section;

  constructor() { }

  ngOnInit() {

  }

}
