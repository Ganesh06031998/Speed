import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CsvFileService } from './csvFile.service';
import { EventModel } from './shared/events.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'sample-testing';
  csvData: EventModel[] = [];

  constructor(private route: ActivatedRoute, private csvFileService : CsvFileService){

  }

  ngOnInit(){
    this.route.url.subscribe( UrlSegment=>{
      const currentUrl = UrlSegment.map(segment=>segment.path).join('/speed');
      console.log('This is app consolse'+currentUrl)
    })
    this.fetchCSVData();
    console.log('After the CSV Data : '+this.csvData.toString);
    console.log(this.csvFileService.events);
  }

  fetchCSVData(){
    this.csvFileService.getCSVData().subscribe(
      (data: string) => {
        console.log('data is '+data)
        this.csvData = this.csvFileService.parseCSVData(data);
        console.log('After the CSV Data : '+ this.csvFileService.parseCSVData(data));
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }
  getcsvData(){
    console.log(this.csvFileService.events);
  }
}
