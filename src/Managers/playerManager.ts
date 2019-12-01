import * as https from 'https';  
import * as request from 'request'; 
import { resolve } from 'dns';
import { rejects } from 'assert';

    
  export const getPlayerStats = async (url:string, username: string, platform:string, game:string): Promise<StatsResponse> =>{
    console.log("values passed: " + username, platform, game); 
   
    request.get(url, {json:true}, (err,res, body) => {
       if(err){
           console.log("error getting player stats")
           throw new Error("Error getting player stats: " + err); 
       }else{
           return JSON.parse(body)
       }
    })
    
     
     const response = {status:"success",data:{"stats":"kd is 0_0"}}
     console.log("returning.." + JSON.stringify(response)); 
    return response; 
   }








export interface StatsResponse{
    status: string 
    data: any
}