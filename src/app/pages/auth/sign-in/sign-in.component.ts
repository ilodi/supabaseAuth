import { Component } from '@angular/core';
import { OptionForms } from '@auth/form/form.component';
import { ACTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-sign-in',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  options: OptionForms = {
    id: ACTIONS.signIn,
    label: ACTIONS.signIn,
  };
}
