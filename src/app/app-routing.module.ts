import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { PermissionGuard } from './guards/permission.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'todo',
    component: TodoComponent,
    resolve: {
      data : PermissionGuard
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
