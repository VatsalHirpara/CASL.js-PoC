import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ability, ForbiddenError, subject } from '@casl/ability';
import { Todo } from 'src/app/model/todo.model';
import { User } from 'src/app/model/user.model';
import { createAbility } from 'src/app/services/Ability';
import { AppAbilityService } from 'src/app/services/app-ability.service';
import interpolate from 'src/app/services/interpolate';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  

  currentUser:User;
 
  todos:Todo[] = [{name:'buy groceries',assignee:'manager',authorId:1},{name:'exercise',assignee:'developer',authorId:2},{name:'finish presentation',assignee:'tester',authorId:3}];

  constructor(private ability: Ability, private appAbilityService:AppAbilityService, private router:Router) { }

  ngOnInit(): void {
   this.currentUser = JSON.parse(window.localStorage.getItem("user"))
   if(window.localStorage.getItem("todos")){
     this.todos = JSON.parse(window.localStorage.getItem("todos")) 
   }
   this.todos= this.todos.map(todo => subject('Todo', todo))
  }

  addTodo(title) {
    let todo = {name:title,assignee:this.currentUser.role,authorId:this.currentUser.id}
    this.todos.push(todo);
    this.todos= this.todos.map(todo => subject('Todo', todo))
    window.localStorage.setItem("todos",JSON.stringify(this.todos))
  }

  removeTodo(todo:Todo) {
    ForbiddenError.from(this.ability).throwUnlessCan('delete', todo);

    if(this.ability.can('delete', todo)){
      const index = this.todos.indexOf(todo);
  
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    }
    window.localStorage.setItem("todos",JSON.stringify(this.todos))
  }

  onItemChange(value: string) {
    let role = value
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


    }, error => console.log(error))

  }

  logout(){
    this.router.navigate(['/'])
  }

}
