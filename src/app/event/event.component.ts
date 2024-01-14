import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EventDetailsModel } from '../shared/eventDetails.model';
import { CsvFileService } from '../csvFile.service';
import { Router } from '@angular/router';

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
    private csvFileService: CsvFileService,
    private router: Router
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

  triggerDestinationFunction(event : string | undefined) {
    // Trigger the handleEvent function in DestinationComponent with a parameter
    
    
    // Navigate to the 'destination' route
    this.router.navigate(['/leaderboard'],{ queryParams: { redirectedFrom: event } });
  }
}
