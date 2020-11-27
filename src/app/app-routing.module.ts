import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { TodoComponent } from './todo/todo/todo.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'todo', component: TodoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
