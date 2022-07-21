import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { BasePageComponentWithDialogs } from 'src/app/components/base-components/base-page/base-page.component';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss']
})
export class SignupStepOneComponent extends BasePageComponentWithDialogs implements OnInit {

  hidePassword = true;
  formSubmited = false;

  registerForm1 = this.formBuilder.group({
    username: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(7) ]),
  });

  constructor(
    errorDialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    super(errorDialog) 
  }

  ngOnInit() {

  }

  onSubmit(registerForm1: FormGroup) {
    if (this.formSubmited || !this.registerForm1.valid) return;
    console.log("Form 1 ->", registerForm1);
  }

}
