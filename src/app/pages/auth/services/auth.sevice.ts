import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import {
  createClient,
  SupabaseClient,
  User,
  Session,
  ApiError,
  UserCredentials,
} from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { USER_STORAGE_KEY } from 'src/app/shared/constants/constant';

type supaBaseResp = User | Session | ApiError | null;

@Injectable({ providedIn: 'root' })
export class AuthServices {
  private supabaseClient: SupabaseClient;
  //observable
  private userSubject = new BehaviorSubject<User | null>(null);
  //
  constructor() {
    this.supabaseClient = createClient(
      environment.supaBase.url,
      environment.supaBase.publicKey
    );
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
  //
  async signIn(credentials: UserCredentials): Promise<supaBaseResp> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signIn(
        credentials
      );
      //set user
      this.setUser();
      return error ? error : user;
    } catch (e) {
      console.log(e);
      return e as ApiError;
    }
  }
  //
  async signUp(credentials: UserCredentials): Promise<supaBaseResp> {
    try {
      const { user, error, ...rest } = await this.supabaseClient.auth.signUp(
        credentials
      );
      //set user
      this.setUser();
      return error ? error : user;
    } catch (e) {
      console.log(e);
      return e as ApiError;
    }
  }

  signOut(): Promise<{ error: ApiError | null }> {
    this.userSubject.next(null);
    return this.supabaseClient.auth.signOut();
  }
  private setUser(): void {
    const session = localStorage.getItem(USER_STORAGE_KEY) as unknown as User;
    this.userSubject.next(session);
  }
}
