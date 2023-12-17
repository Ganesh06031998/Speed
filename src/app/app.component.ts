import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CsvFileService } from './csvFile.service';
import { EventModel } from './shared/events.model';
import { EventDetailsModel } from './shared/eventDetails.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'sample-testing';
  csvEventsData: EventModel[] = [];
  csvEventDetailsData: EventDetailsModel[] = [];

  constructor(private route: ActivatedRoute, private csvFileService : CsvFileService){

  }

  ngOnInit(){
    this.route.url.subscribe( UrlSegment=>{
      const currentUrl = UrlSegment.map(segment=>segment.path).join('/speed');
    })
    this.fetchCSVData();
  }

  fetchCSVData(){
    this.csvFileService.getEventsCSVData().subscribe(
      (data: string) => {
        this.csvEventsData = this.csvFileService.parseEventsCSVData(data);
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )

    this.csvFileService.getEventDetailsCSVData().subscribe(
      (data : string) => {
        this.csvEventDetailsData = this.csvFileService.parseEventDetailsCSVData(data);
      },
      (error) => {
        console.error('Error fetching EventDatails CSV data:', error);
      }
    )
  }
}
