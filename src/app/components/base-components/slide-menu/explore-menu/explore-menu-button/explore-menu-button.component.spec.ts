import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMenuButtonComponent } from './explore-menu-button.component';

describe('ExploreMenuButtonComponent', () => {
  let component: ExploreMenuButtonComponent;
  let fixture: ComponentFixture<ExploreMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreMenuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
