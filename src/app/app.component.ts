import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CsvFileService } from './csvFile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'sample-testing';

  constructor(private route: ActivatedRoute, private csvFileService : CsvFileService){
  }

  ngOnInit(){
    this.route.url.subscribe( UrlSegment=>{
      const currentUrl = UrlSegment.map(segment=>segment.path).join('/speed');
    })
  }
}
