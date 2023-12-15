import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  homePage = true;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('HomeComponent');
  }
}
