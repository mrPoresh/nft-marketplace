import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MintErc721Component } from './mint-erc721.component';

describe('MintErc721Component', () => {
  let component: MintErc721Component;
  let fixture: ComponentFixture<MintErc721Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MintErc721Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MintErc721Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
