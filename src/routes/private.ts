import * as express from 'express'; 
export const privateRoutes = express.Router(); 


privateRoutes.get('/info', (req, res) =>{console.log("Getting private info"); res.send("Getting private info")})

