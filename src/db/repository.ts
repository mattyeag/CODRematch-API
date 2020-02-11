import * as knex from 'knex'; 
import {User,insertQueryObject} from '../utils/customTypes';
import * as db from './dbManager'; 


export const getUsersByUserName = (userName:string) =>{
    var paramArray = userName.toLowerCase().split(','); 
    var sqlString = knex("table").select().from("users").whereIn("users.username",paramArray).toString(); 
    sqlString = sanitizeSQL(sqlString);  
    return sqlString; 
}


export const getUsersData = (userName : string): Promise<any> => {
    return new Promise( (resolve,reject)  => {
     db.executeSelectQuery(getUsersByUserName(userName))
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

export const insertUser = (playerData : User): Promise<any> => {
    console.dir(playerData);
    var queryObject = createInsertUserSql(playerData);
    console.log("Executing query***: " + JSON.stringify(queryObject));  
    return new Promise( (resolve,reject)  => {
     db.addNewUserAndAuth(queryObject.insertUserSql,queryObject.insertAuthSql)
     .then(results => {
        resolve(results);
        })
     .catch(err =>{ 
        console.error("error getting data for user: " + playerData)
        reject(err); 
     })
    });
}

export const createInsertUserSql = (playerData: User): insertQueryObject =>{
    const userValues : any = {
        email: playerData.userEmail,
        username: playerData.userName,
        display_name: playerData.displayName,
        first_name: playerData.firstName,
        last_name: playerData.lastName,
        date_of_birth: playerData.dateOfBirth,
    } 
    const authValues : any = {
        username: playerData.userName,
        private_key: playerData.key,
    } 
    let inserterUserSql = sanitizeSQL(knex("table").table('USERS').insert(userValues).toString()); 
    let insertAuthSql = sanitizeSQL(knex("table").table('USER_AUTH').insert(authValues).toString()); 
    return {insertUserSql: inserterUserSql, insertAuthSql: insertAuthSql}
}

function sanitizeSQL(sql:string){
 sql = sql.replace(/`/g, "");
 return sql; 
}




