import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserService } from '../services/user.service';
import { User } from '../model/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent {
  private message: string;
  private userName: string;
  constructor(private userService: UserService) { }

  public create() {
    let user: User = { oid: undefined, username: this.userName, isOnline: undefined };
    console.log(user);
    this.userService.createUser(user);
  }

}