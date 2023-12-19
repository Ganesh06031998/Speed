import { IndividualModel } from "./individual.model";

export class TeamModel{
    teamNumber: number | undefined;
    teamName !: string ;
    teamMembers!: IndividualModel[];
    score: number | undefined;
    
    // constructor(teamNumber : number, teamName : string, teamMembers : IndividualModel[], score : number){ 

    // }
}