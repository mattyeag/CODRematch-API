import * as knex from 'knex'; 
import {User} from '../utils/customTypes';


export const getUsersByUserName = (userName:string) =>{
    var paramArray = userName.toLowerCase().split(','); 
    var sqlString = knex("table").select().from("users").whereIn("users.username",paramArray).toString(); 
    sqlString = sanitizeSQL(sqlString);  
    return sqlString; 
}


export const insertPlayer = (playerData: User) =>{
    const insertValues : any = {
        email: playerData.userEmail,
        username: playerData.userName,
        first_name: playerData.firstName,
        last_name: playerData.lastName,
        date_of_birth: playerData.dateOfBirth,
    } 
    var sqlString = knex("table").table('users').insert(insertValues).toString(); 
    return sanitizeSQL(sqlString); 
}



function sanitizeSQL(sql:string){
 sql = sql.replace(/`/g, "");
 return sql; 
}




function replaceKey(sql:string, keys:string, params:string){
        var sqlQuery = sql.replace(keys, params)
        console.log("generated query: " + sqlQuery); 
        return sqlQuery; 
}



