import * as requestPromise from 'request-promise';
import {PlayerParams,User, Player} from '../utils/customTypes';  
import * as constants from '../utils/constants'; 
import * as db from '../db/dbManager'; 
import * as repository from '../db/repository';   
import { reject } from 'bluebird';

    
/*
TODO: move COD API CALLS to differnt API for game apis
*/ 

//   export const getPlayerStats = async (params:PlayerParams): Promise<any> =>{
//     var options = {
//         method: 'GET',
//         uri: getStatusURL(constants.COD_API_URL_PLAYER_STATS, params),
//         json: true
//         }
//         const playerStats = await requestPromise(options);

//       return playerStats; 
//     };
     

    
    // export const getPlayersFriendsStats = async (params:PlayerParams): Promise<any> =>{
    //     var options = {
    //         method: 'GET',
    //         uri: getStatusURL(constants.COD_API_URL_FRIENDS_STATS, params),
    //         json: true
    //         }
    //         const playerStats = await requestPromise(options);
            
    //       return playerStats; 
    //     };
         


    // const getStatusURL = (url:string, params: PlayerParams) => {
    //     url = url.replace('gameTitle:', params.gameTitle);
    //     url = url.replace('platform:', params.platform);
    //     url = url.replace('userName:', params.userName);
    //     console.log("calling with url: " + url); 
    //     return url; 
    // }
    

export const createPlayer = (playerData: Player):Promise<any> =>{
  return new Promise((res,rej) =>{
    repository.insertPlayer(playerData).then((response : Array<Player>) =>{
        console.log("response in createPlayer())")   
        res(response);
        }).catch((error) =>{
            let errorString = error.toString();
            console.log("createPlayer errorString: " , errorString)
            if(errorString.includes('violates unique constraint "players_pkey"')){
                rej(`player already exists for gamer ${playerData.player_tag}`)
            }
            rej(error);
        })
    })
}
