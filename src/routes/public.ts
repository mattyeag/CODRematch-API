import * as player from '../Managers/playerManager'
import * as express from 'express'; 
import {PlayerParams} from '../utils/customTypes'; 
export const publicRoutes = express.Router(); 


publicRoutes.post('/cod/stats', async (req, res) =>{
   var params : PlayerParams = {userName: req.body.username, gameTitle: req.body.game, platform: req.body.platform  }
    try{

        let response = await player.getPlayerStats(params)
        if(response.status == 'success'){
            res.send(response);
        }else{
            res.send({status:'error', message: `error calling player stats api. Response: ${JSON.stringify(response)}`}); 
        }
    }catch(error){
        console.error("error calling to get player stats", error); 
    }
})

publicRoutes.get('/friends', (req, res) =>{console.log("get player friends"); res.send("DONE")})

