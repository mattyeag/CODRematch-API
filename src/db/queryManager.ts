import * as knex from 'knex'; 
import {User} from '../utils/customTypes';


export const getUsersByEmail = (email:string) =>{
    var paramArray = []; 
    paramArray.push(email); 
    var sqlString = knex("table").select().from("users").whereIn("users.email",paramArray).toString(); 
    sqlString = sanitizeSQL(sqlString); 
    return sqlString; 
}


export const insertPlayer = (playerData: User) =>{
    const insertValues : any = {
        email: playerData.email,
        gamer_tag: playerData.gamerTag,
        platform_cd: playerData.platform,
        game_cd: playerData.gameCode,
        party_id: null,
        last_login: playerData.loginDate, 
        crt_ts: new Date()
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



