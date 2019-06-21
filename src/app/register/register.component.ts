import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { UserService } from '../services/user.service';
import User from '../model/user.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export default class RegisterComponent {
  private message: string;
  private userName: string;
  constructor(private userService: UserService, private location: Location) { }

  public create() {
    let user: User = { oid: undefined, username: this.userName, isOnline: undefined };
    this.userService.createUser(user).subscribe(
      (u: User) => {
        user = u;
        this.userName = user.username;
        this.location.go(`rooms/${user.oid}`);
      },
      (error: HttpErrorResponse) => {
        this.message = error.statusText;
      }
    );
  }

}