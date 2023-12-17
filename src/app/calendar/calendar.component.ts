import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CsvFileService } from '../csvFile.service';
import { EventModel } from '../shared/events.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  eventDetails : EventModel[]=[];

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('CalendarComponent');
    this.getEvents();
  }
  getEvents(){
    this.eventDetails = this.csvFileService.getArrayOfEvents();
  }
}
