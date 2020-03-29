import { Team, TeamMemberStatus} from "../utils/customTypes";
import * as repository from '../db/repository';  


export const createTeam = (teamData: Team):Promise<any> =>{
    return new Promise((res,rej) =>{
      repository.insertTeam(teamData).then((response : Team) => {
            console.log("response in createPlayer())")   
            res(response);
          }).catch((error) =>{
              let errorString = error.toString();
              console.log("createPlayer errorString: " , errorString)
              if(errorString.includes('violates unique constraint "teams_pkey"')){
                  rej(`player already exists for user Id: ${teamData.ownerUserId}`)
              }
              rej(error);
          })
      })
  }
  

  export const updateTeamMemberStatus = (playerInvite: TeamMemberStatus):Promise<any> =>{
    return new Promise((res,rej) =>{
      repository.updateTeamMemberStatus(playerInvite).then((response : Team) => {
            res(response);
          }).catch((error) =>{
              rej(error);
          })
      })
  }
  