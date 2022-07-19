import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletMainComponent } from './connect-wallet-main.component';

describe('ConnectWalletMainComponent', () => {
  let component: ConnectWalletMainComponent;
  let fixture: ComponentFixture<ConnectWalletMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectWalletMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectWalletMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
