import { User, UserLoginInput, UserAuthObj } from "../utils/customTypes";
import * as knex from 'knex'; 
import {sanitizeSQL} from '../db/repository'
import * as db from '../db/dbManager'


export const getUserAuth = (userParams: UserLoginInput): Promise<any> =>{
    let userName = userParams.username.toLowerCase();
    
    return new Promise((res,rej) => {
        let authSql = sanitizeSQL(knex("table").select().from("user_auth").where('user_auth.username', userName).toString())
        db.executeSelectQuery(authSql).then((response: Array<UserAuthObj>) => {
            res(response.pop())
        }).catch( err =>{
           console.log("error selecting user: "+ userName)
           throw err;
        })   
    })
   }
   

   export const isPasswordValid = (userAuth:UserAuthObj, userInput:string): boolean => {
      if(userAuth && userAuth.private_key){
          return userAuth.private_key == userInput; 
      }
      return false; 
   }