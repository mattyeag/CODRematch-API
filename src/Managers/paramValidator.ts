import {PlayerParams,User} from '../utils/customTypes'; 

export const codStatsParamsValid = (params:PlayerParams): Array<any> =>{
  var errorArray: Array<any> = []; 
    if(!params.gameTitle){
        errorArray.push(" gameTitle");
    }
    if(!params.platform){
        errorArray.push(" platform");
    }
    if(!params.userName){
        errorArray.push(" userName");
    }
return errorArray; 
}


export const addUserParamsValid = (params:User): Array<any> =>{
    var errorArray: Array<any> = []; 
      if(!params.email){
          errorArray.push(" email");
      }
      if(!params.platform){
          errorArray.push(" platform");
      }
      if(!params.gamerTag){
          errorArray.push(" gamerTag");
      }
      if(!params.gameCode){
          errorArray.push(" gameCode");
      }
  return errorArray; 
  }