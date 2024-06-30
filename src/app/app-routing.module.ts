// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guards/login/login.component';
import { RegisterComponent } from './guards/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './board/board.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, /*canActivate: [AuthGuard] */ },
  { path: 'game', component: BoardComponent, /*canActivate: [AuthGuard] */},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
