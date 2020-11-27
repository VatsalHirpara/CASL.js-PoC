import { Component, OnInit } from '@angular/core';
import { Ability, AbilityBuilder, defineAbility, ForbiddenError, subject } from '@casl/ability';
import { build$ } from 'protractor/built/element';
import { Todo } from './model/todo.model';
import { User } from './model/user.model';
import { AppAbilityService } from './services/app-ability.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'casl-poc';

  constructor(private ability: Ability, private appAbilityService:AppAbilityService){

  }
  
  ngOnInit(): void {
    // let user:User = {name:'member',role:'member',id:2}
    // let user2:User = {name:'member',role:'member',id:3}

    // const ability = this.appAbilityService.defineAbilities(user)
    // // ForbiddenError.from(ability).throwUnlessCan('update', subject('User', user2));
    // console.log(ability);    
  }
}

