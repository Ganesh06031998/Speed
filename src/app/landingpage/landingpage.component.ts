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
  private overall = '../assets/CSV files/IndividualLeaderboard.csv';
  dataSource = new MatTableDataSource<any>(this.userList);
  displayedColumns: string[] = ['Ecode', 'Name', 'Score'];
 
  homePage = true;
  constructor(private dataService: DataService, private csvFileService: CsvFileService) { }
  ngOnInit(): void {
    this.dataService.changeMessage('HomeComponent');
    this.fetchCSVData(this.overall);
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

  barChartLabels = ['UnScramble', 'One minute Speed Story', 'Networking event', 'Teasure hunt','Speed Rapid fire Quiz','Speed learning workshop'];
  barChartLegend = true;
  barChartType: ChartType = 'bar'; // Use Chart.ChartType type

  barChartData = [
    { data: [65, 59, 80, 81,24,79], label: 'Members partcipated',backgroundColor: '#74C657',hoverBackgroundColor: '#4CAF20',color:'#333'},
    
  ];
  trackByFn(index: number, item: any) {
    return item.id; // replace 'id' with your unique identifier property
  }
}
