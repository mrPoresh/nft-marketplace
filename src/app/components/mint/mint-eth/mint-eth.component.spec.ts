import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintEthComponent } from './mint-eth.component';

describe('MintEthComponent', () => {
  let component: MintEthComponent;
  let fixture: ComponentFixture<MintEthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintEthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintEthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
