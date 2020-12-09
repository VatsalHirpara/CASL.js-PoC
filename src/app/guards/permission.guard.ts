import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Ability } from '@casl/ability';
import { Observable } from 'rxjs';
import { createAbility } from '../services/Ability';
import { AppAbilityService } from '../services/app-ability.service';
import interpolate from '../services/interpolate';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements Resolve<any> {
 
  constructor(private appAbilityService:AppAbilityService, private ability: Ability){}
   resolve(){
    console.log('in resolve method');
    let user  = JSON.parse(window.localStorage.getItem('user'))

    let permissions
    let rules
    
      this.appAbilityService.getPermissions(user.role).subscribe((res) => {
      permissions = res.permissions
      permissions = interpolate(JSON.stringify(permissions),{user})
      let userAbility = createAbility(permissions);
      rules = userAbility.rules
      this.ability.update(userAbility.rules)
      return rules
    }, error => console.log(error))    
  }
}
