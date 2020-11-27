import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ability } from '@casl/ability';
import { User } from 'src/app/model/user.model';
import { AppAbilityService } from 'src/app/services/app-ability.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string
  password:string

  users=[]
  constructor(private router:Router,private ability: Ability, private appAbilityService:AppAbilityService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form){

    let user:User = {role:form.value.username}    
    
    const abilities = this.appAbilityService.defineAbilities(user)
    this.ability.update(abilities.rules)    

    if(this.ability.can('route',{})){
      this.router.navigate(['todo'])
    }
    else{
      window.alert('not allowed')
    }

  }

}
