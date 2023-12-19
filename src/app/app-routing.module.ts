import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';
import { IndividualBoardComponent } from './individual-board/individual-board.component';
import { GroupBoardComponent } from './group-board/group-board.component';

export const routes: Routes = [
    { path: '', redirectTo: '/speed', pathMatch: 'full' },
    { path: 'speed', component: HomeComponent },
    { path: 'calender', component: CalendarComponent },
    { path: 'event', component: EventComponent },
    {
        path: 'leaderboard', component: LeaderboardComponent,
        children: [
        { path: 'individual', component: IndividualBoardComponent }, 
        { path: 'team', component: GroupBoardComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }