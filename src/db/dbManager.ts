import {Client} from 'pg'; 



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
                    console.log("error executing query"); 
                    client.end();
                    throw err;
                }else{
                    client.end();
                    console.dir("Connection closed:"); 
                    console.log("res.rows: " + res.rows); 
                    resolve({status:"success", data:res.rows})
                }
            });

        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject({status:"error", message:error}); 
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
                if (err){ 
                    console.log("error executing query"); 
                    client.end();
                    reject(err);
                }else{
                    client.end()
                    console.dir("Connection closed:")
                    resolve({status:"success",updatedRows:res.rowCount}); 
                }
            });

        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject({status:"error", message:error}); 
        }

    });
}



export const addNewUserAndAuth =  (newUserQuery:string, newAuthQuery:string): Promise<any> => {
    return new Promise( async (resolve,reject) =>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
      client.connect();
        try{
            console.dir("connection made"); 
           await client.query('BEGIN')
           await client.query(newAuthQuery); 
           await client.query(newUserQuery);
           await client.query('COMMIT')
            console.dir("Connection closed:")
            client.end()
            resolve({status:"success"}); 
        }catch(error){
            if(client){
               console.error("error during db proccess: ", error, "client is: " + client);
             await  client.query('ROLLBACK')
               client.end();
               reject({status:"error", message:error}); 
            }
        }
    });
}
