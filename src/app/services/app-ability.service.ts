import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Ability, AbilityBuilder, ForcedSubject, RawRuleOf } from '@casl/ability';
import { User } from '../model/user.model';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppAbilityService {

  baseURL = 'http://localhost:4200';

  constructor(private http: HttpClient) {
  }

  defineAbilities(user: User) {
    const actions = ['manage', 'delete', 'add', 'route', 'viewTable'] as const;
    const subjects = ['User', 'Todo', 'all'] as const;
    type AppAbilities = [
      typeof actions[number],
      typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
    ];

    type AppAbility = Ability<AppAbilities>;

    type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
    type Roles = 'member' | 'admin';

    const rolePermissions: Record<Roles, DefinePermissions> = {
      member(user, { can }) {
        can('add', 'Todo')
        can('viewTable', 'all')
      },
      admin(user, { can }) {
        can('add', 'Todo')
        can('delete', 'Todo')
        can('route', 'all')

      }
    };

    const builder = new AbilityBuilder<AppAbility>(Ability as any);

    if (typeof rolePermissions[user.role] === 'function') {
      rolePermissions[user.role](user, builder);
    } else {
      throw new Error(`Trying to use unknown role "${user.role}"`);
    }

    return builder.build();

  }

  getPermissions(role: string) {
    return this.http.get(`${this.baseURL}/assets/permissions/${role}-permissions.json`)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError));
  }

  handleError(error: Response) {

    console.log(error);

    return throwError(new Error("Not Found"));

  }







}