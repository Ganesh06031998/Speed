import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { IndividualModel } from '../shared/individual.model';
import { CsvFileService } from '../csvFile.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-individual-board',
  templateUrl: './individual-board.component.html',
  styleUrls: ['./individual-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndividualBoardComponent implements OnInit {

  userList: IndividualModel[] = [];
  private overall = '../assets/CSV files/IndividualLeaderboard.csv';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  options = [
    {value:'Overall',  path:'../assets/CSV files/IndividualLeaderboard.csv'},
    {value:'Unscramble', path:'../assets/CSV files/Unscramble.csv'},
    {value:'SPEED Rapid Fire Quiz', label:"SPEED Rapid Fire Quiz", path:'../assets/CSV files/SPEEDRapidFireQuiz.csv'},
    {value:'One Minute SPEED Story', label:"One Minute SPEED Story", path:'../assets/CSV files/OneMinuteSPEEDStory.csv'},
    {value:'Learning and Development Community', label:"Learning and Devlopment Community", path:'../assets/CSV files/LearningandDevlopmentCommunity.csv'},
    {value:'Flash Decision Making Challenge', label:"Flash Decision Making Challenge", path:'../assets/CSV files/FlashDecisionMakingChallenge.csv'}
  ];

  dataSource = new MatTableDataSource<any>(this.userList);
  displayedColumns: string[] = ['Ecode', 'Name', 'Score'];
  constructor(private dataService: DataService, private csvFileService: CsvFileService) { }

  ngOnInit(): void {
    this.dataService.changeMessage('IndividualBoardComponent');
    this.fetchCSVData(this.overall);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Fetch the User Data
  fetchCSVData(csvUrl : string) {
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is ' + data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        this.dataSource.data=this.userList;
        this.dataSource.paginator = this.paginator;
        console.log('After the CSV Data :::::: ' + this.userList);
        this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }

  //Logging User Values
  getcsvData() {
    console.log('All CSV Data:');
    this.userList.forEach((user: IndividualModel) => {
      console.log('Ecode:', user.Ecode);
      console.log('User Name:', user.Name);
      console.log('Score:', user.Score);
      console.log('---------------------------');
    });
  }

  //to Get User Name as Clickable link
  getuserName(user: IndividualModel): string {
    if (user) {
      return `<a href="" class="text-decoration-none text-dark">${user.Name}</a>`;
    }

    return "";
  }

  //Handle all eventCategory events
  handleValue(csvUrl : string): void{
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is ' + data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        this.dataSource.data=this.userList;
        console.log('After the CSV Data :::::: ' + this.userList);
        this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }

  //Filter for the Table
  applyFilter(event: Event, column: string): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: IndividualModel, filter: string) => {
      const columnValue = (data[column as keyof IndividualModel] as string).toLowerCase();
      return columnValue.includes(filter);
    };

    this.dataSource.filter = filterValue;
  }
}
