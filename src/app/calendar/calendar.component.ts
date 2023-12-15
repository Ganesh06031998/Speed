import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('CalendarComponent');
  }
}
