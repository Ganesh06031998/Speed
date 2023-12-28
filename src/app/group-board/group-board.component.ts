import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { TeamModel } from '../shared/team.model';
import { CsvFileService } from '../csvFile.service';
import { IndividualModel } from '../shared/individual.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-group-board',
  templateUrl: './group-board.component.html',
  styleUrls: ['./group-board.component.css'],
  encapsulation: ViewEncapsulation.None //for arrow of sorting
})
export class GroupBoardComponent implements OnInit {

  options=[{value:'OVERALL', path:'../assets/CSV files/groupLeaderboard.csv'},
  {value:'TEASURE Hunt', path:'../assets/CSV files/TeasureHunt.csv'},
  {value:'SPEED Networking Event', path:'../assets/CSV files/SPEEDNetworkingEvent.csv'}]

  teamList: TeamModel[] = [];
  private csvUrl = '../assets/CSV files/groupLeaderboard.csv';
  dataSource = new MatTableDataSource<any>(this.teamList);
  displayedColumns: string[] = ['TeamNumber', 'TeamName', 'TeamMembers','Score'];

  userList: IndividualModel[] = [];
  private csvUrlInd = '../assets/CSV files/IndividualLeaderboard.csv';

  filteredTeams: TeamModel[] = this.teamList; // Initially, show all teams

  constructor(private dataService : DataService, private csvFileService : CsvFileService) { }

  //Pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataService.changeMessage('GroupBoardComponent');
    this.fetchCSVDataValues();
    this.fetchCSVData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Fetch Team Data
  fetchCSVData(){
    this.csvFileService.getCSVData(this.csvUrl).subscribe(
      (data: string) => {
        console.log('data is '+data);
        this.teamList = this.csvFileService.parseCSVDataTeam(data,this.userList);
        this.dataSource.data = this.teamList;  
        console.log('After the CSV Data :::::: '+ this.teamList);
          this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }

  //Logging Team Data
  getcsvData() {
    console.log('All CSV Data:');
    this.teamList.forEach((team: TeamModel) => {
      console.log('Team Number:', team.TeamNumber);
      console.log('TeamName:', team.TeamName);
      console.log('TeamName:', team.TeamMembers);
      console.log('Team Score',team.Score);
      console.log('---------------------------');
    });
  }
  
  //Fetch Individual Data
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

  //Get eam Members as Clickable profile link
  getTeamMembers(team: TeamModel): string {
    if (team && team.TeamMembers) {
      
      return team.TeamMembers.map(member => {
        const isEcodeZero =member.Ecode != 0;
        console.log(isEcodeZero);
        const style="color: black;"
        const link = `<a href="" [attr.disabled]="${isEcodeZero}" class="text-decoration-none text-dark">${member.Name}</a>`;
        return isEcodeZero ? link : member.Name;
      }).join(', ');
    }
  
    return "";
  }

  //Handle function for Event Category
  handleValue(csvUrl : string): void{
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is '+data);
        this.teamList = this.csvFileService.parseCSVDataTeam(data,this.userList);
        this.dataSource.data = this.teamList;  
        console.log('After the CSV Data :::::: '+ this.teamList);
          this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }

  // Apply Filter Function
  applyFilter(event: Event, column: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: TeamModel, filter: string) => {
      const columnValue = column === 'TeamMembers'
        ? data[column ].map((member: { Name: string; }) => member.Name.toLowerCase()).join(', ')
        : (data[column as keyof TeamModel] as string).toLowerCase();
      return columnValue.includes(filter);
    };

    this.dataSource.filter = filterValue;
  }
}
