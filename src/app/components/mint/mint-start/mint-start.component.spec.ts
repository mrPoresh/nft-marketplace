import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintStartComponent } from './mint-start.component';

describe('MintStartComponent', () => {
  let component: MintStartComponent;
  let fixture: ComponentFixture<MintStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
