import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { MIX_DIALOG_CONFIG } from 'src/app/components/base-components/dialogs/dialog.config';

export interface SignupDialogData {

}


@Component({
  template: '',
  selector: 'app-signup-dialog-route',
})
export class SignupDialogRouteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
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
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignupDialogComponent
  ) { }

  public redirectUrl: string = "../"

  closeDialog(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }



}
