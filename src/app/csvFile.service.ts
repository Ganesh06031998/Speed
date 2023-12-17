import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Observable } from "rxjs";
import { EventModel } from './shared/events.model';
import { EventDetailsModel } from "./shared/eventDetails.model";

@Injectable({
    providedIn: "root"
})
export class CsvFileService {
    events: EventModel[] = [];
    eventDetails : EventDetailsModel[] = [];
    
    private csvEventUrl = '../assets/EventCalender.csv';
    private csvEventDetailsUrl = '../assets/Events.csv';

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
}