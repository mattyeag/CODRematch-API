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
      if(!params.userEmail){
          errorArray.push(" userEmail");
      }
      if(!params.userName){
          errorArray.push(" userName");
      }
      if(!params.firstName){
          errorArray.push(" firstName");
      }
      if(!params.lastName){
          errorArray.push(" lastName");
      }
      if(!params.dateOfBirth){
        errorArray.push(" dateOfBirth");
      }
      if(!params.lastName){
        errorArray.push(" gameCode");
      }
      if(!params.key){
        errorArray.push(" key");
      }

  return errorArray; 
  }