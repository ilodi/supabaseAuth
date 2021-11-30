import { Component } from '@angular/core';
import { OptionForms } from '@auth/form/form.component';
import { ACTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-sign-up',
  // templateUrl: './sign-up.component.html',
  template: `<app-form [options]="options"></app-form>`,
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  options: OptionForms = {
    id: ACTIONS.signUp,
    label: ACTIONS.signUp,
  };
}
