import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private router: Router, private dataService : DataService) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check if the route is empty when navigation occurs
      this.isChildWithSubchild();
    });
  }

  ngOnInit(): void {
    this.dataService.changeMessage('LeaderboardComponent');
  }

  isChildWithSubchild(): boolean {
    const currentRoute = this.router.routerState.root;
 
    // Check if the current route has a child
    if (currentRoute.children.length > 0) {
      const childRoute = currentRoute.children[0];
      // Check if the child route has a subchild
      return childRoute.children.length > 0 ? false : true;
    }
    return true;
  }

}
