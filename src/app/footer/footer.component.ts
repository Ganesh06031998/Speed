import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  pageComponent= '';

  constructor(private dataService : DataService){

  }
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(
      message => {
        console.log('Header Message '+message);
        this.pageComponent = message;
        console.log('footer Status ' + this.pageComponent);
      }
      )
  }

}
