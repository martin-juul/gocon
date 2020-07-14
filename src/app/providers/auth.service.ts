import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthRequest {
  mainNumber: string;
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
  allowFullWebAccess: boolean;
  allowSoftphoneAccess: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrls.api;

  private currentTokenSubject: BehaviorSubject<AuthToken>;
  public currentToken: Observable<AuthToken>;

  private readonly STORAGE_KEY = 'auth_token';

  public get currentTokenValue(): AuthToken {
    return this.currentTokenSubject.value;
  }

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<AuthToken>(JSON.parse(localStorage.getItem(this.STORAGE_KEY)));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  login(body: AuthRequest) {
    return this.http.post<AuthToken>(`${this.baseUrl}/manager/v1/token`, body, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .pipe(map(token => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(token));
        this.currentTokenSubject.next(token);
        return token;
      }));
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentTokenSubject.next(null);
  }
}
