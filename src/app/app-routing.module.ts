import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSectionComponent } from './game-section/game-section.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {path: 'gameSection', component: GameSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
