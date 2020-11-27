import { Component, OnInit } from '@angular/core';
import { Ability } from '@casl/ability';
import { Todo } from 'src/app/model/todo.model';
import { User } from 'src/app/model/user.model';
import { AppAbilityService } from 'src/app/services/app-ability.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  role:string ='member';

  todos:Todo[] = [{name:'buy groceries',assignee:'member'},{name:'exercise',assignee:'admin'}];

  constructor(private ability: Ability, private appAbilityService:AppAbilityService) { }

  ngOnInit(): void {
  }

  addTodo(todo) {
    let t = {name:todo,assignee:'admin'}
    this.todos.push(t);
  }

  removeTodo(todo) {

    console.log(this.ability.can('delete', Todo));

    if(this.ability.can('delete', Todo)){
      const index = this.todos.indexOf(todo);
  
      if (index !== -1) {
        this.todos.splice(index, 1);
      }
    }
  }

  onItemChange(value){
    this.role = value
    let user:User = {name:'test',role:this.role,id:2}
    
    const abilities = this.appAbilityService.defineAbilities(user)
    this.ability.update(abilities.rules)    
    
 }

}
