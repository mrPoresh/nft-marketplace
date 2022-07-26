import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPasswordMainComponent } from './lost-password-main.component';

describe('LostPasswordMainComponent', () => {
  let component: LostPasswordMainComponent;
  let fixture: ComponentFixture<LostPasswordMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPasswordMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPasswordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
