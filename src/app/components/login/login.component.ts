import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ability, ForbiddenError } from '@casl/ability';
import { User } from 'src/app/model/user.model';
import { AppAbilityService } from 'src/app/services/app-ability.service';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { createAbility } from 'src/app/services/Ability';

import { get } from 'lodash';
import interpolate from 'src/app/services/interpolate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  password: string

  users = []
  currentUser: User;

  constructor(private router: Router, private ability: Ability, private appAbilityService: AppAbilityService, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  onSubmit(form) {

    let role = form.value.username
    let id = role==='admin'? 1 : 2 

    let user: User = { name: 'username', role: role, id: id }
    let booking = { name:'bookingname',status: 'active',id:99}
    
    this.currentUser = user

    let permissions;
    this.appAbilityService.getPermissions(role).subscribe((res) => {
      permissions = res.permissions
      permissions = interpolate(JSON.stringify(permissions),{user,booking})

      console.log(permissions);      
      let userAbility = createAbility(permissions);
      this.ability.update(userAbility.rules)
      console.log(this.ability.rules);
      this.router.navigate(['todo'])

    }, error => console.log(error))
    window.localStorage.setItem("user",JSON.stringify(user))
  }

  interpolate(template: string, vars: object) {
    return JSON.parse(template, (_, rawValue) => {
      if (rawValue[0] !== '$') {
        return rawValue;
      }

      const name = rawValue.slice(2, -1);
      const value = get(vars, name);

      if (typeof value === 'undefined') {
        throw new ReferenceError(`Variable ${name} is not defined`);
      }

      return value;
    });
  }

}