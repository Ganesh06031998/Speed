import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  pageComponent = '';

  constructor(private dataService : DataService){

  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      message => {
        this.pageComponent = message;
      }
      )
      this.dataService.changeMessage('HeaderComponent');
  }
}
