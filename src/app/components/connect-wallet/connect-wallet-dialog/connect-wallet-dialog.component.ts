import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { MIX_DIALOG_CONFIG } from '../../base-components/dialogs/dialog.config';


@Component({
  template: '',
  selector: 'app-connect-wallet-route',
})
export class ConnectWalletDialogRouteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConnectWalletDialogComponent, {
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
  selector: 'app-connect-wallet-dialog',
  templateUrl: './connect-wallet-dialog.component.html',
  styleUrls: ['./connect-wallet-dialog.component.scss']
})
export class ConnectWalletDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConnectWalletDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConnectWalletDialogComponent
  ) { }

  public redirectUrl: string = "../"

  closeDialog(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

}
