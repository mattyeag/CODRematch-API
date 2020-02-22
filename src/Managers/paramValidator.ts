import {PlayerParams,User, UserLoginInput,Player} from '../utils/customTypes'; 
import { request } from 'https';

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


  export const loginParamasValidate = (params:UserLoginInput): Array<string> =>{
    let paramErrors: Array<string> = [];
    if(!params.username){
        paramErrors.push(' :username');
     }
     if(!params.password){
        paramErrors.push(' :password');
     }
     return paramErrors; 
  }

  export const createPlayerValidate = (params: Player):Array<string> =>{
    let paramErrors: Array<string> = [];
    if(!params.user_id){
        paramErrors.push(':user_id')
    }
    if(!params.player_tag){
        paramErrors.push(':player_tag')
    }
    if(!params.game_id){
        paramErrors.push(':game_id')
    }
    if(!params.platform_id){
        paramErrors.push(':platform_id')
    }
    return paramErrors;
  }