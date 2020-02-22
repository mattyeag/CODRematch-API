import * as express from 'express'; 
import {userRoutes} from './src/routes/user-routes'
import {authRoutes} from './src/routes/auth-routes'
import {playerRoutes} from './src/routes/player-routes'
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

app.use('/myeteam', userRoutes); 
app.use('/user', authRoutes)
app.use('/player', playerRoutes)
app.use('/health', (err,res)=>{console.log("app is healthy"); res.sendStatus(200)})
