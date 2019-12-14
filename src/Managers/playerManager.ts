import * as requestPromise from 'request-promise';
import {PlayerParams} from '../utils/customTypes';  
import * as constants from '../utils/constants'; 
  
  
    
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
         





const getStatusURL = (url:string, params: PlayerParams) => {
    url = url.replace('gameTitle:', params.gameTitle);
    url = url.replace('platform:', params.platform);
    url = url.replace('userName:', params.userName);
    console.log("calling with url: " + url); 
    return url; 
}

