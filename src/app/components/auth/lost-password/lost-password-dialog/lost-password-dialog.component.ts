import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { MIX_DIALOG_CONFIG } from 'src/app/components/base-components/dialogs/dialog.config';

export interface LostPasswordDialogData {

}

@Component({
  template: '',
  selector: 'app-lost-password-dialog-route',
})
export class LostPasswordDialogRouteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LostPasswordDialogComponent, {
      ...MIX_DIALOG_CONFIG,
      backdropClass: "fullPrimaryBackdropBackground",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([dialogRef.componentInstance.redirectUrl]);
    });
  }
  
}
@Component({
  selector: 'app-lost-password-dialog',
  templateUrl: './lost-password-dialog.component.html',
  styleUrls: ['./lost-password-dialog.component.scss']
})
export class LostPasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LostPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LostPasswordDialogData
  ) { }

  public redirectUrl: string = "../"

  closeDialog(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
