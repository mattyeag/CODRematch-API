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
                    console.log("res.rows count: " + res.rowCount); 
                    
                    resolve(res.rows)
                }
            });

        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject(error); 
        }

    });
}


export const executeNonSelectQuery = (query : string): Promise<any> => {
    return new Promise(async (resolve,reject) =>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
        try{
         await client.connect();
            console.dir("connection made"); 
         await client.query(query, (err, response) => {
                if (err){ 
                    console.log("error executing query"); 
                    client.end();
                    console.log("db error: " , err.toString())
                    reject(err);
                }else{
                    client.end()
                    console.dir("Connection closed:")
                    resolve(response.rowCount); 
                }
            });
        }catch(error){
            console.error("error during db proccess: ", error);
            if(client){
                client.end()
            }reject(error); 
        }
    });
}



export const addNewUserAndAuth =  (newUserQuery:string, newAuthQuery:string, userEmail:string): Promise<any> => {
    return new Promise( async (resolve,reject) =>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      });
      client.connect();
        try{
            console.dir("connection made"); 
            await client.query(`Select count(*) from users where email = '${userEmail}'`)
            .then(results =>{ 
            if(results.rows[0].count != 0){
                throw new Error(`a user exists with email ${userEmail}`)
            }
           }).catch(err =>{throw err})
           await client.query('BEGIN')
           await client.query(newAuthQuery); 
           await client.query(newUserQuery);
           await client.query('COMMIT')
            client.end()
            console.dir("Connection closed:")
            resolve(true); 
        }catch(error){
            let errorMessage = error.toString()
            if(client){
             console.log("rolling back")
             await  client.query('ROLLBACK')
               client.end();
            }
            if(errorMessage.includes('duplicate key value')){
                errorMessage = errorMessage + " username is already taken"
            }
            reject(errorMessage); 
        }
    });
}
