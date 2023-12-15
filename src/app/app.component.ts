import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'sample-testing';

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.url.subscribe( UrlSegment=>{
      const currentUrl = UrlSegment.map(segment=>segment.path).join('/speed');
      console.log('This is app consolse'+currentUrl)
    }

    )
  }
}
