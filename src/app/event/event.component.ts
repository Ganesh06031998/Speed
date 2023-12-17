import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EventDetailsModel } from '../shared/eventDetails.model';
import { CsvFileService } from '../csvFile.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventDetails : EventDetailsModel[]=[];

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('EventComponent');
    this.getEventDetails();
  }

  getEventDetails(){
    this.eventDetails = this.csvFileService.getArrayOfEventDetails();
  }
}
