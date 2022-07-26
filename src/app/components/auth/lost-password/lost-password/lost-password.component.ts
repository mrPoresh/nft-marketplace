import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent extends BasePageComponentWithDialogs implements OnInit {

  lostForm = this.formBuilder.group({
    username: new FormControl('', [ Validators.required, Validators.email ])
  });

  constructor(
    errorDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    super(errorDialog)
  }

  ngOnInit() {
    
  }

  onSubmit(lostForm: FormGroup) {           /* by def error like a test */
    console.log("Lost Form ->", lostForm);
    this.openErrorDialog("Ups, something going wrong!");
  }

}
