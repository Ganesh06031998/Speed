import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IndividualModel } from '../shared/individual.model';
import { CsvFileService } from '../csvFile.service';

@Component({
  selector: 'app-individual-board',
  templateUrl: './individual-board.component.html',
  styleUrls: ['./individual-board.component.css']
})
export class IndividualBoardComponent implements OnInit {

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('IndividualBoardComponent');
    this.fetchCSVData();
  }

  userList: IndividualModel[] = [];
  private csvUrl = '../assets/IndividualLeaderboard.csv';
  fetchCSVData(){
    this.csvFileService.getCSVData(this.csvUrl).subscribe(
      (data: string) => {
        console.log('data is '+data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
          console.log('After the CSV Data :::::: '+ this.userList);
          this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }
  getcsvData() {
    console.log('All CSV Data:');
    this.userList.forEach((user: IndividualModel) => {
      console.log('Ecode:', user.ecode);
      console.log('User Name:',  user.userName);
      console.log('Score:', user.score);
      console.log('---------------------------');
    });
  }

  getuserName(user: IndividualModel): string {
    if (user) {
      return `<a href="" class="text-decoration-none text-dark">${user.userName}</a>`;
    }
  
    return "";
  }
}
