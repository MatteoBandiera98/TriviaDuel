import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guards/login/login.component';
import { RegisterComponent } from './guards/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './board/board.component';
import { DiceComponent } from './dice/dice.component';
import { QuestionComponent } from './question/question.component';
import { PlayerComponent } from './player/player.component';
import { AuthService } from './guards/auth.service';
import { GameService } from './services/game.service';
import { QuestionService } from './services/question.service';
import { AuthGuard } from './guards/auth.guard';
import { QuizComponent } from './quiz/quiz.component';
import { MenuComponent } from './menu/menu.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardComponent,
    DiceComponent,
    QuestionComponent,
    PlayerComponent,
    QuizComponent,
    MenuComponent,
    ImpostazioniComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Aggiungi BrowserAnimationsModule per abilitare le animazioni CSS
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    GameService,
    QuestionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

