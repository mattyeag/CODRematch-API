import * as requestPromise from 'request-promise';
import {PlayerParams,User} from '../utils/customTypes';  
import * as constants from '../utils/constants'; 
import * as db from '../db/dbManager'; 
import * as sql from '../db/queryManager';   

    
  export const getPlayerStats = async (params:PlayerParams): Promise<any> =>{
    var options = {
        method: 'GET',
        uri: getStatusURL(constants.COD_API_URL_PLAYER_STATS, params),
        json: true
        }
        const playerStats = await requestPromise(options);

      return playerStats; 
    };
     

    
    export const getPlayersFriendsStats = async (params:PlayerParams): Promise<any> =>{
        var options = {
            method: 'GET',
            uri: getStatusURL(constants.COD_API_URL_FRIENDS_STATS, params),
            json: true
            }
            const playerStats = await requestPromise(options);
            
          return playerStats; 
        };
         

// search how to use promises in api calls properly...
    export const getUsersData = (userName : string): Promise<any> => {
        return new Promise( (resolve,reject)  => {
         db.executeSelectQuery(sql.getUsersByEmail(userName))
         .then(results => {
            console.log("results returned for user: " + userName); 
            resolve(results);
            })
         .catch(err =>{ 
            console.error("error getting data for user: " + userName)
            console.error("error", err); 
            reject(err); 
         })
        });
    }


    export const insertPlayer = (playerData : User): Promise<any> => {
        console.dir(playerData);
        var query = sql.insertPlayer(playerData);
        console.log("Executing query***: " + query);  
        return new Promise( (resolve,reject)  => {
         db.executeNonSelectQuery(query)
         .then(results => {
            resolve(results);
            })
         .catch(err =>{ 
            console.error("error getting data for user: " + playerData)
            reject(err); 
         })
            console.log("returning query: " + query); 
        });
    }


const getStatusURL = (url:string, params: PlayerParams) => {
    url = url.replace('gameTitle:', params.gameTitle);
    url = url.replace('platform:', params.platform);
    url = url.replace('userName:', params.userName);
    console.log("calling with url: " + url); 
    return url; 
}

