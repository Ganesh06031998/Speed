import { IndividualModel } from "./individual.model";

export class TeamModel{
    TeamNumber: number | undefined;
    TeamName !: string ;
    TeamMembers!: IndividualModel[];
    Score: number | undefined;
    
    // constructor(teamNumber : number, teamName : string, teamMembers : IndividualModel[], score : number){ 

    // }
}