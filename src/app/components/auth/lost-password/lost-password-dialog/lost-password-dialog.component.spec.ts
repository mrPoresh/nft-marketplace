import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPasswordDialogComponent } from './lost-password-dialog.component';

describe('LostPasswordDialogComponent', () => {
  let component: LostPasswordDialogComponent;
  let fixture: ComponentFixture<LostPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostPasswordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
