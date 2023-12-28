import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Observable } from "rxjs";
import { EventModel } from './shared/events.model';
import { IndividualModel } from "./shared/individual.model";
import { TeamModel } from "./shared/team.model";
import { EventDetailsModel } from "./shared/eventDetails.model";

@Injectable({
    providedIn: "root"
})
export class CsvFileService {
    events: EventModel[] = [];
    individualBoard: IndividualModel[] = [];
    teamBoard: TeamModel[] = [];
    eventDetails : EventDetailsModel[] = [];
    private arraryOfIndividualBoard: IndividualModel[] = [];
    private arraryOfGroupBoard: TeamModel[] = [];
    
    private csvEventUrl = '../assets/CSV files/EventCalender.csv';
    private csvEventDetailsUrl = '../assets/CSV files/Events.csv';

    constructor(private http: HttpClient) { }

    /**
     * Above is to fetch the Events for calendar from CSV file 
     */

    getEventsCSVData() : Observable<any>{
        return this.http.get(this.csvEventUrl, { responseType: 'text' });
    }

    parseEventsCSVData(csvData : string) : EventModel[]{
        const  parsedData = Papa.parse(csvData, { header: false, skipEmptyLines: true })
        this.events =  parsedData.data.map((row : any) => {
            const event = new EventModel();
            event.eventName = row[0];
            event.eventType = row[1];
            event.date = row[2];
            event.status = row[3];
            return event;
        });
        return this.events;
    }

    getArrayOfEvents(): EventModel[]{
        return this.events;
    }
    
    /**
     * Above is to fetch the EventDetails from CSV file 
     */
    getEventDetailsCSVData() : Observable<any>{
        return this.http.get(this.csvEventDetailsUrl, { responseType : 'text' });
    }

    parseEventDetailsCSVData(csvData : string) : EventDetailsModel[]{
        const  parsedData = Papa.parse(csvData, { header: false, skipEmptyLines: true })
        this.eventDetails =  parsedData.data.map((row : any) => {
            const details = new EventDetailsModel();
            details.imgPath = row[0];
            details.title = row[1];
            details.description = row[2];
            return details;
        });
        return this.eventDetails;
    }

    getArrayOfEventDetails(): EventDetailsModel[]{
        return this.eventDetails;
    }

    getCSVData(csvurl: string): Observable<any> {
        return this.http.get(csvurl, { responseType: 'text' });
    }

    parseCSVDataIndividual(csvData: string): IndividualModel[] {
        const parsedData = Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
        });
        console.log('parsed Data ' + parsedData.data);
        this.individualBoard = parsedData.data.map((row: any) => {
          const user = new IndividualModel();
          user.Ecode = row[0];
          user.Name = row[1];
          user.Score = row[2];
          return user;
        });
        console.log(this.individualBoard);
        this.setarraryOfIndividualBoard(this.individualBoard);
        return this.individualBoard;
      }
    
      parseCSVDataTeam(csvData: string,userlist:IndividualModel[]): TeamModel[] {
        const parsedData = Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
        });
        console.log('parsed Data ' + parsedData.data);
        this.teamBoard = parsedData.data.map((row: any) => {
          const team = new TeamModel();
          team.TeamNumber = row[0];
          team.TeamName = row[1];
          let resultArray: string[] = row[2]?.split('<br>') ?? []; 
          console.log("User Available:::"+resultArray);
          const matchingUsernames = resultArray.filter(username => 
            userlist.some(user => user.Name === username)
          );
          // Add the matching usernames to teamMembers
          team.TeamMembers = userlist.filter(user => matchingUsernames.includes(user.Name));
          resultArray.forEach(username => {
            if (!matchingUsernames.includes(username)) {
              const newUser = new IndividualModel();
              newUser.Name = username;
              newUser.Ecode=0;
              // Set default values for other properties if needed
              team.TeamMembers.push(newUser);
              userlist.push(newUser);
            }
          });
          team.Score = row[3];
          console.log("TEAM VALUES::::::"+team);
          return team;
        });
        this.setarraryOfGroupBoard(this.teamBoard);
        return this.teamBoard;
      }
      getarraryOfIndividualBoard(): IndividualModel[] {
        return this.arraryOfIndividualBoard;
      }
      setarraryOfIndividualBoard(value: IndividualModel[]) {
        this.arraryOfIndividualBoard = value;
      }
      getarraryOfGroupBoard(): TeamModel[] {
        return this.arraryOfGroupBoard;
      }
      setarraryOfGroupBoard(value: TeamModel[]) {
        this.arraryOfGroupBoard = value;
      }
}