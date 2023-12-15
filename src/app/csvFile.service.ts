import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as Papa from 'papaparse';
import { Observable } from "rxjs";
import { EventModel } from './shared/events.model';

@Injectable({
    providedIn: "root"
})
export class CsvFileService {
    events: EventModel[] = [];
    private arraryOfEvents : EventModel[]=[];
    
    private csvUrl = '../assets/EventCalender.csv';

    constructor(private http: HttpClient) { }

    getCSVData() : Observable<any>{
        return this.http.get(this.csvUrl, { responseType: 'text' });
    }

    parseCSVData(csvData : string) : EventModel[]{
        const  parsedData = Papa.parse(csvData, { header: false, skipEmptyLines: true })
        console.log('parsed Data '+parsedData.data);
        this.events =  parsedData.data.map((row : any) => {
            const event = new EventModel();
            event.eventName = row[0];
            event.eventType = row[1];
            event.date = row[2];
            event.status = row[3];
            console.log(event);
            return event;
        });
        console.log(this.events);
        this.setArrayOfEvents(this.events);
        return this.events;
    }

    fetchDataFromCSV(){
        this.http.get(this.csvUrl, { responseType: 'text' }).subscribe(
            (csvData) => {
                console.log(csvData);
                this.convertCSVtoObject(csvData);
            },
            (error) => {
                console.error('Error while fetching from CSV data: '+error);
            }
        );
    }

    convertCSVtoObject(csvData : any){
        const  parsedData = Papa.parse(csvData, {
            header: true,
            complete: (result) =>{
                console.log(result.data);
                this.processCSVObjects(result.data);
            },
            error: (error) =>{
                console.error('Error Parsing CSV: '+error);
            },
        });
    }

    processCSVObjects(data : any[]){
        console.log('CSV Objects:', data);
    }

    setArrayOfEvents(data : EventModel[]){
        this.arraryOfEvents = data;
    }
    getArrayOfEvents(): EventModel[]{
        return this.arraryOfEvents;
    }
}