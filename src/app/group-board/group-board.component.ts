import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TeamModel } from '../shared/team.model';
import { CsvFileService } from '../csvFile.service';
import { IndividualModel } from '../shared/individual.model';

@Component({
  selector: 'app-group-board',
  templateUrl: './group-board.component.html',
  styleUrls: ['./group-board.component.css']
})
export class GroupBoardComponent implements OnInit {

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('GroupBoardComponent');
    this.fetchCSVDataValues();
    this.fetchCSVData();
  }


  teamList: TeamModel[] = [];
  private csvUrl = '../assets/groupLeaderboard.csv';
  fetchCSVData(){
    this.csvFileService.getCSVData(this.csvUrl).subscribe(
      (data: string) => {
        console.log('data is '+data);
        this.teamList = this.csvFileService.parseCSVDataTeam(data,this.userList);
          console.log('After the CSV Data :::::: '+ this.teamList);
          this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }
  getcsvData() {
    console.log('All CSV Data:');
    this.teamList.forEach((team: TeamModel) => {
      console.log('Team Number:', team.teamNumber);
      console.log('TeamName:', team.teamName);
      console.log('TeamName:', team.teamMembers);
      console.log('Team Score',team.score);
      console.log('---------------------------');
    });
  }
  userList: IndividualModel[] = [];
  private csvUrlInd = '../assets/IndividualLeaderboard.csv';
  fetchCSVDataValues(){
    this.csvFileService.getCSVData(this.csvUrlInd).subscribe(
      (data: string) => {
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        console.log('After the CSV Data :::::: '+ this.userList);
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }
  getTeamMembers(team: TeamModel): string {
    if (team && team.teamMembers) {
      
      return team.teamMembers.map(member => {
        const isEcodeZero =member.ecode != 0;
        console.log(isEcodeZero);
        const style="color: black;"
        const link = `<a href="" [attr.disabled]="${isEcodeZero}" class="text-decoration-none text-dark">${member.userName}</a>`;
        return isEcodeZero ? link : member.userName;
      }).join(', ');
    }
  
    return "";
  }
}
