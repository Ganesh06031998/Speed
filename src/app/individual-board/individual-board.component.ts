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
  selectedOption: string = 'Overall Details';
  userList: IndividualModel[] = [];
  private overall = '../assets/IndividualLeaderboard.csv';

  options = [
    {value:'Overall Details', label:"Overall Details", path:'../assets/IndividualLeaderboard.csv'},
    {value:'Unscramble', label:"Unscramble", path:'../assets/Unscramble.csv'},
    {value:'Teasure Hunt', label:"Teasure Hunt", path:'../assets/TeasureHunt.csv'},
    {value:'SPEED Rapid Fire Quiz', label:"SPEED Rapid Fire Quiz", path:'../assets/SPEEDRapidFireQuiz.csv'},
    {value:'One Minute SPEED Story', label:"One Minute SPEED Story", path:'../assets/OneMinuteSPEEDStory.csv'},
    {value:'SPEED Networking Event', label:"SPEED Networking Event", path:'../assets/SPEEDNetworkingEvent.csv'},
    {value:'Learning and Devlopment Community', label:"Learning and Devlopment Community", path:'../assets/LearningandDevlopmentCommunity.csv'},
    {value:'Flash Decision Making Challenge', label:"Flash Decision Making Challenge", path:'../assets/FlashDecisionMakingChallenge.csv'}
  ];

  constructor(private dataService: DataService, private csvFileService: CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('IndividualBoardComponent');
    this.onOptionChange();
  }
  fetchCSVData(csvUrl : string) {
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is ' + data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        console.log('After the CSV Data :::::: ' + this.userList);
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
      console.log('User Name:', user.userName);
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

  onOptionChange() {
    console.log('Selected Option:', this.selectedOption);
    this.options.forEach((option : any) => {
      if(this.selectedOption === option.label){
        console.log('selected path '+ option.path);
        this.fetchCSVData(option.path);
      }
    });
  }
}
