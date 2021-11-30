import { Component } from '@angular/core';
import { AuthServices } from '@auth/services/auth.sevice';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private readonly _authSvc: AuthServices) {}
  user$ = this._authSvc.user$;

  async onLogout(): Promise<void> {
    try {
      console.log('2');
      await this._authSvc.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
