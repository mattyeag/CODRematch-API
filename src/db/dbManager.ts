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
                    throw err;
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

