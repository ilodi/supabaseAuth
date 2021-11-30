import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '@auth/services/auth.sevice';
import { UserCredentials } from '@supabase/gotrue-js';
import { ACTIONS } from 'src/app/shared/constants/constant';
export interface OptionForms {
  id: string;
  label: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  authForm!: FormGroup;
  @Input() options!: OptionForms;
  signIn = ACTIONS.signIn;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _authSvc: AuthServices
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit(): void {
    console.log('save');
    const credentials: UserCredentials = this.authForm.value;
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
