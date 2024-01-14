import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { IndividualModel } from '../shared/individual.model';
import { CsvFileService } from '../csvFile.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TeamModel } from '../shared/team.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-individual-board',
  templateUrl: './individual-board.component.html',
  styleUrls: ['./individual-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndividualBoardComponent implements OnInit {

  selectedOption: any; 
  userList: IndividualModel[] = [];
  private overall = '../assets/CSV files/IndividualLeaderboard.csv';
  teamList: TeamModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  options = [
    {value:'Overall',  path:'../assets/CSV files/IndividualLeaderboard.csv',image:'../assets/Overall.png',selected:false},
    {value:'Overall Team', path:'../assets/CSV files/groupLeaderboard.csv',image:'../assets/Overall.png',selected:false},
    {value:'Unscramble', path:'../assets/CSV files/Unscramble.csv',image:'../assets/Unscramble.jpg',selected:false},
    {value:'Mascot Challenge', path:'../assets/CSV files/Mascot.csv',image:'../assets/Mascot.jpg',selected:false},
    {value:'SPEED Rapid Fire Quiz',  path:'../assets/CSV files/SPEEDRapidFireQuiz.csv',image:'../assets/rapid fire.png',selected:false},
    {value:'One Minute SPEED Story', path:'../assets/CSV files/OneMinuteSPEEDStory.csv',image:'../assets/one minute speed story.png',selected:false},
    {value:'Learning and Development Community', path:'../assets/CSV files/LearningandDevlopmentCommunity.csv',image:'../assets/learning and dev.png',selected:false},
    {value:'SPEED Learning Workshop', path:'../assets/CSV files/LearningWorkshop.csv',image:'../assets/learning workshop.jpg',selected:false},
    {value:'Flash Decision Making Challenge',path:'../assets/CSV files/FlashDecisionMakingChallenge.csv',image:'../assets/Decision making.jpg',selected:false},
   {value:'Treasure Hunt', path:'../assets/CSV files/TeasureHunt.csv',image:'../assets/Teasure Hunt.jpg',selected:false},
  {value:'SPEED Networking Event', path:'../assets/CSV files/SPEEDNetworkingEvent.csv',image:'../assets/networking event.jpg',selected:false}
  ];

  dataSource = new MatTableDataSource<any>(this.userList);
  displayedColumns: string[] = ['Ecode', 'Name', 'Score'];
  constructor(private dataService: DataService,  private route: ActivatedRoute, private csvFileService: CsvFileService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.changeMessage('IndividualBoardComponent');
    const redirectedFrom = this.route.snapshot.queryParams['redirectedFrom'];
    if (redirectedFrom) {
      this.handleEvent(redirectedFrom);
    } else {
      // Load overall data if not redirected from Events
      this.handleEvent('Overall');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Fetch the User Data
  fetchCSVData(csvUrl : string) {
    this.options.forEach(option => {
      option.selected = option.path === csvUrl;
    });
    this.selectedOption = this.options.find(option => option.selected);
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

  //Fetch overall Group data
  fetchCSVDataGroup(csvurlValue : string){
    this.csvFileService.getCSVData(csvurlValue).subscribe(
      (data: string) => {
        console.log('data is '+data);
        this.teamList = this.csvFileService.parseCSVDataTeam(data,this.userList);
        this.dataSource.data = this.teamList; 
        this.displayedColumns= Object.keys(this.teamList[0]); 
        console.log('After the CSV Data :::::: '+ this.teamList);
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

  handleEvent(event : string){
    this.selectedOption = this.options.find(option => {
      return option.value===event;
    });
    this.handleValue(this.selectedOption.path);
  }
  //Handle all eventCategory events
  handleValue(csvUrl : string): void{
    this.options.forEach(option => {
      option.selected = option.path === csvUrl;
    });
    this.selectedOption = this.options.find(option => option.selected);
    if(this.selectedOption.path.includes('groupLeaderboard') || this.selectedOption.path.includes('SPEEDNetworkingEvent')
    || this.selectedOption.path.includes('TeasureHunt')){
      this.fetchCSVDataGroup(csvUrl);
    }
    else{
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is ' + data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        this.dataSource.data=this.userList;
        this.displayedColumns= Object.keys(this.userList[0]); 
        console.log('After the CSV Data :::::: ' + this.userList);
        this.getcsvData();
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )}
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

  calculateContainerHeight(): string {
    const minHeight = 500; // Set a minimum height
  const itemsPerPage = this.paginator?.pageSize || 5; // Default to 5 if paginator is undefined
  const currentPage = this.paginator?.pageIndex + 1 || 1; // Default to page 1 if paginator is undefined

  console.log(itemsPerPage);
  // Calculate the height based on the number of items per page and the current page
  let calculatedHeight=0;
  if(itemsPerPage===10)
  calculatedHeight = Math.max(minHeight, itemsPerPage * currentPage * 70); 
  else// Adjust the multiplier as needed
  calculatedHeight = Math.max(minHeight, itemsPerPage * currentPage * 70); 

  const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width as needed
  if (mediaQuery.matches && this.dataSource.data.length >=10) {
    if(itemsPerPage===10)
    calculatedHeight = Math.max(minHeight, itemsPerPage * currentPage * 70); 
    else
    calculatedHeight = Math.max(minHeight, itemsPerPage * currentPage * 50); 
  } 

  const mediaQuery1 = window.matchMedia('(max-width: 490px)'); // Adjust the max-width as needed
  if (mediaQuery1.matches && this.dataSource.data.length >=10) {
    if(itemsPerPage===10)
    calculatedHeight = Math.min(minHeight, itemsPerPage * currentPage * 100); 
    else if (itemsPerPage===25 && this.dataSource.data.length >=25)
    calculatedHeight = Math.max(minHeight, itemsPerPage * currentPage * 40); 
    else
    calculatedHeight = Math.min(minHeight, itemsPerPage * currentPage * 70); 
  } 
  else if(mediaQuery1.matches)
  calculatedHeight = 250;
  console.log("Calculate height",calculatedHeight);
    return calculatedHeight + 'px';
    
  }
}
