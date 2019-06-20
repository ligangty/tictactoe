import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly apiUrl: string = environment.apiRoot + "user";
  constructor(private http: HttpClient) { }

  public getUser(oid: string): Observable<any> {
    return this.http.get(this.apiUrl, { params: { "oid": oid } });
  }

  public createUser(user: User): Observable<any> {
    console.log(`start create user ${user}`);
    return this.http.post(this.apiUrl, user);
  }
}