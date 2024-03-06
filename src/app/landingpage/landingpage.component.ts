import {  ChartType } from 'chart.js';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IndividualModel } from '../shared/individual.model';
import { DataService } from '../data.service';
import { CsvFileService } from '../csvFile.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
  animations: [
    trigger('slideAnimation', [
      state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class LandingpageComponent  {

  userList: IndividualModel[] = [];
  IndividualEvents: string[] = [
    '../assets/CSV files/CrosswordPuzzle.csv',
    '../assets/CSV files/Mascot.csv',
    '../assets/CSV files/Unscramble.csv',
    '../assets/CSV files/SPEEDRapidFireQuiz.csv',
  ];
  TeamEvents: String[] = [
    '../assets/CSV files/TeasureHunt.csv',
    '../assets/CSV files/SPEEDNetworkingEvnt.csv',
  ];
  private overall = '../assets/CSV files/IndividualLeaderboard.csv';
  dataSource = new MatTableDataSource<any>(this.userList);
  displayedColumns: string[] = ['Ecode', 'Name', 'Score'];
 
  homePage = true;
  constructor(private dataService: DataService, private csvFileService: CsvFileService) { }
  ngOnInit(): void {
    this.dataService.changeMessage('HomeComponent');
    this.mergedIndividualEvents();
  }

  fetchCSVData(csvUrl : string) {
    this.csvFileService.getCSVData(csvUrl).subscribe(
      (data: string) => {
        console.log('data is ' + data)
        this.userList = this.csvFileService.parseCSVDataIndividual(data);
        this.dataSource.data=this.userList.slice(0,10);
        console.log('After the CSV Data :::::: ' + this.userList);
      },
      (error) => {
        console.error('Error fetching CSV data:', error);
      }
    )
  }

  barChartOptions : any = {
    scales: {
      x: [{ ticks: { fontSize: 2,fontColor: 'black' },gridLines: {
        display: false, // hide x-axis grid lines
      },},],
      y: [{ ticks: { fontSize: 2,fontColor: 'black' } ,gridLines: {
        display: false, // hide x-axis grid lines
      }}],
    },
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines:false,
    responsive: true,
    elements: {
      line: {
        tension: 0, // disables bezier curves
      },
    },
  };

  barChartLabels = ['Mascot','UnScramble','Crossword Puzzle','One minute Speed Story', 'Networking event', 'Teasure hunt','Speed Rapid fire Quiz','Speed learning workshop'];
  barChartLegend = true;
  barChartType: ChartType = 'bar'; // Use Chart.ChartType type

  barChartData = [
    { data: [267,431,0,0,0,0,0,0], label: 'Members partcipated',backgroundColor: '#74C657',hoverBackgroundColor: '#4CAF20',color:'#333'},
    
  ];
  trackByFn(index: number, item: any) {
    return item.id; // replace 'id' with your unique identifier property
  }
  mergedIndividualEvents(): void {
    const mergedIndividualModels: IndividualModel[] = [];

    for (const individualEvent of this.IndividualEvents) {
      // Fetch CSV data for the individual event
      this.csvFileService
        .getCSVData(individualEvent)
        .subscribe((csvData: string) => {
          // Parse CSV data and get individual models for the current event
          const individualModelsForEvent =
            this.csvFileService.parseCSVDataIndividual(csvData);

          // Iterate through the individual models and update the merged array
          for (const individualModel of individualModelsForEvent) {
            // Check if the individual model already exists in the merged array
            const existingModel = mergedIndividualModels.find(
              (mergedModel) => mergedModel.Name === individualModel.Name
            )!;

            if (
              existingModel != undefined &&
              existingModel.Score != undefined
            ) {
              // If the model exists, add up the points
              existingModel.Score += individualModel.Score ?? 0;
            } else {
              // If the model doesn't exist, add it to the merged array
              mergedIndividualModels.push({ ...individualModel });
             
            }
            mergedIndividualModels.sort((a, b) => (b.Score || 0) - (a.Score || 0));
            this.userList = mergedIndividualModels;
            this.dataSource.data = this.userList.slice(0,10);
          }
        });
    }
    
    console.log('CSV' + mergedIndividualModels.length);
  }
}
