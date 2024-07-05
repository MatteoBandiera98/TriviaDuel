// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guards/login/login.component';
import { RegisterComponent } from './guards/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './board/board.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'game', component: BoardComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'menu', component: MenuComponent }, // Aggiungi la route per MenuComponent
  { path: 'impostazioni', component: ImpostazioniComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
