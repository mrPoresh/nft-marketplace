import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintErc1155Component } from './mint-erc1155.component';

describe('MintErc1155Component', () => {
  let component: MintErc1155Component;
  let fixture: ComponentFixture<MintErc1155Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintErc1155Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintErc1155Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
