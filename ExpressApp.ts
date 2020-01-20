import * as express from 'express'; 
import {publicRoutes} from './src/routes/public'
import {privateRoutes} from './src/routes/private'
import * as bodyParser from 'body-parser'; 
import * as dotenv from 'dotenv'; 
const cron = require('node-cron');


console.log("starting cron job..."); 
    cron.schedule("*/2 * * * *", ()=>{
        console.log("app is alive at time: " + new Date())
})


dotenv.config(); 
export const app = express()
app.use(bodyParser.json()); 

app.use('/public', publicRoutes); 
app.use('/private', privateRoutes);  
app.use('/health', (err,res)=>{console.log("app is healthy"); res.sendStatus(200)})
