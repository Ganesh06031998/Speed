import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-individual-board',
  templateUrl: './individual-board.component.html',
  styleUrls: ['./individual-board.component.css']
})
export class IndividualBoardComponent implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('IndividualBoardComponent');
  }

}
