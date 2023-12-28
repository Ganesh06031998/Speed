import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EventDetailsModel } from '../shared/eventDetails.model';
import { CsvFileService } from '../csvFile.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  eventDetails: EventDetailsModel[] = [];
  private csvEventDetailsUrl = '../assets/CSV files/Events.csv';

  constructor(
    private dataService: DataService,
    private csvFileService: CsvFileService
  ) {}

  ngOnInit(): void {
    this.dataService.changeMessage('EventComponent');
    this.fetchCSVData();
  }

  fetchCSVData() {
    this.csvFileService.getCSVData(this.csvEventDetailsUrl).subscribe(
      (data: string) => {
        this.eventDetails = this.csvFileService.parseEventDetailsCSVData(data);
      },
      (error) => {
        console.error('Error fetching EventDatails CSV data:', error);
      }
    );
  }
}
