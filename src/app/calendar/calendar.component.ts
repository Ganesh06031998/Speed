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
  private csvEventUrl = '../../assets/CSV files/EventCalender.csv';

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('CalendarComponent');
    this.fetchCSVData();
  }
  
  fetchCSVData(){
    this.csvFileService.getCSVData(this.csvEventUrl).subscribe(
      (data: string) => {
        this.eventDetails = this.csvFileService.parseEventsCSVData(data);
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }
}
