import * as knex from 'knex'; 
import {User,insertQueryObject, UserLoginInput,Player} from '../utils/customTypes';
import * as db from './dbManager'; 
import { reject } from 'bluebird';



export const getUsersByUserName = (userName:string) =>{
    var paramArray = userName.toLowerCase().split(','); 
    var sqlString = knex("table").select().from("users").whereIn("users.username",paramArray).toString(); 
    sqlString = sanitizeSQL(sqlString);  
    return sqlString; 
}


// export const authenticateUser = (userParams: UserAuth): Promise<any> =>{
//  return new Promise((res,rej) => {
//      let userName = userParams.username.toLowerCase();
//      let authSql = sanitizeSQL(knex("table").select().from("user_auth").where('user_auth.username', userName).toString())
//      console.log("authenticating")
//      db.executeSelectQuery(authSql).then((response) => {
//          let data = response.data;
//          console.log(data); 
//          resolve(data)
//      }).catch( err =>{
//         console.log("error selecting user: "+ userName)
//         throw err;
//      })
//  })
// }

export const getUsersData = (userName : string): Promise<any> => {
    return new Promise( (resolve,reject)  => {
     db.executeSelectQuery(getUsersByUserName(userName))
     .then((results: Array<User>)=> {
        resolve(results);
        })
     .catch(err =>{ 
        reject(err); 
     })
    });
}

export const insertUser = (playerData : User): Promise<any> => {
    console.dir(playerData);
    var queryObject = createInsertUserSql(playerData);
    return new Promise( (resolve,reject)  => {
     db.addNewUserAndAuth(queryObject.insertUserSql,queryObject.insertAuthSql, playerData.userEmail)
     .then(results => {
        resolve(results);
        })
     .catch(err =>{ 
        reject(err); 
     })
    });
}

export const createInsertUserSql = (userData: User): insertQueryObject =>{
    const userValues : any = {
        email: userData.userEmail,
        username: userData.userName,
        display_name: userData.displayName,
        first_name: userData.firstName,
        last_name: userData.lastName,
        date_of_birth: userData.dateOfBirth,
    } 
    const authValues : any = {
        username: userData.userName,
        private_key: userData.key,
    } 
    let inserterUserSql = sanitizeSQL(knex("table").table('USERS').insert(userValues).toString()); 
    let insertAuthSql = sanitizeSQL(knex("table").table('USER_AUTH').insert(authValues).toString()); 
    return {insertUserSql: inserterUserSql, insertAuthSql: insertAuthSql}
}

export const insertPlayer = (playerData: Player): Promise<any> => {
    return new  Promise((res,rej) => {
        const playerValues = {
            user_id : playerData.user_id,
            game_id : playerData.game_id,
            platform_id : playerData.platform_id,
            player_tag : playerData.player_tag,
            alt_player_tag : playerData.alt_player_tag || null,
            player_pass : playerData.player_pass || null,
            team_id : playerData.team_id || null,
        }
        let insertPlayerSQL = sanitizeSQL(knex('table').table('PLAYERS').insert(playerValues).toString())
        db.executeNonSelectQuery(insertPlayerSQL).then((response: Array<Player>) =>{
           console.log("response in insertPlayer())")
            res(response);
        }).catch((error) =>{
            console.log("error in insertPlayer())")
            rej(error)
        })
    })
}



export function sanitizeSQL(sql:string){
 sql = sql.replace(/`/g, "");
 return sql; 
}




