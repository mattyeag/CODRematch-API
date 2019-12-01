import * as express from 'express'; 
import {publicRoutes} from './src/routes/public'
import {privateRoutes} from './src/routes/private'
import * as bodyParser from 'body-parser'; 

export const app = express()
app.use(bodyParser.json()); 

app.use('/public', publicRoutes); 
app.use('/private', privateRoutes);  