import {Client} from 'pg'; 
import { resolve } from 'bluebird';



export const executeSelectQuery = (query : string): Promise<any> => {
    return new Promise((resolve,reject) =>{

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
        try{
            client.connect();
            console.dir("connecting do DB"); 
            
            client.query(query, (err, res) => {
                if (err){ 
                    client.end();
                    throw err;
                }
            console.dir("Connection closed:")
            console.dir(res.rows); 
            if(res.rows && res.rows.length > 0){    
                resolve(res.rows)
            }else{
                console.log("NO DATA FOUND")
                reject(`NO DATA FOUND`); 
            }
            });

        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject("INTERNAL ERROR IN DATA CALL"); 
        }

    });
}


export const executeNonSelectQuery = (query : string): Promise<any> => {
    return new Promise((resolve,reject) =>{

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
        try{
            client.connect();
            console.dir("connection made"); 
            
            client.query(query, (err, res) => {
                console.log("RESPONSE:" + res); 
                if (err){ 
                    console.log("error executing query"); 
                    client.end();
                    throw err;
                }
            console.dir("Connection closed:")
            console.dir("rows updated: " +res.rowCount); 
            if(res.rowCount > 0){    
                resolve({updatedRows:res.rowCount}); 
            }else{
                console.log("no rows were updated"); 
                reject(`no rows were updated`); 
            }
            });

        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject("INTERNAL ERROR IN DATA CALL"); 
        }

    });
}

