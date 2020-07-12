import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  mainNumber: string;
  username: string;
  name: string;
  token: string | null;
}

export interface LoginParams {
  mainNumber: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  HAS_LOGGED_IN = 'hasLoggedIn';

  private _data: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public data: Observable<User> = this._data.asObservable();

  constructor(private storeService: StoreService) {
    this.storeService.openStore('gocon', 'user_data', true, 'secret')
      .then(() => console.log('UserDataService: didOpen'))
      .catch(console.error);
  }

  async isLoggedIn() {
    return this.storeService.getItem(this.HAS_LOGGED_IN);
  }

  public async login({mainNumber, username, password}: LoginParams) {
    const res: User = {
      mainNumber,
      username,
      name: 'Martin Juul',
      token: '2341ælj1ih2341234',
    };

    console.log(await this.storeService.getItem(this.HAS_LOGGED_IN));

    console.log(await this.storeService.setItem(this.HAS_LOGGED_IN, JSON.stringify(res)));

    const data: unknown = await this.storeService.getItem(this.HAS_LOGGED_IN);
    console.log(data);

    if (!data) {
      throw new Error('Could not fetch user');
    }

    this._data.next(<User>data);
  }

}
