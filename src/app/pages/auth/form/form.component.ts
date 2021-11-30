import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '@auth/services/auth.sevice';
import { ApiError, User, UserCredentials } from '@supabase/gotrue-js';
import { ACTIONS } from 'src/app/shared/constants/constant';
export interface OptionForms {
  id: string;
  label: string;
}
interface UserResponse extends User, ApiError {}
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
    private readonly _authSvc: AuthServices,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  async onSubmit(): Promise<void> {
    console.log('save');
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;
    if (this.options.id === ACTIONS.signIn) {
      actionToCall = this._authSvc.signIn(credentials);
    } else {
      actionToCall = this._authSvc.signUp(credentials);
    }
    try {
      const result = (await actionToCall) as UserResponse;
      if (result.email) {
        //redirect to home
        this.redirectUser();
        console.log('Welcome user');
      } else {
        //show notification
        console.log('Alert');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private redirectUser(): void {
    this.router.navigate(['/home']);
  }
}
