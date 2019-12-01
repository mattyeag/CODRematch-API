import * as player from '../Managers/playerManager'
import * as express from 'express'; 
import * as constants from '../utils/constants'
export const publicRoutes = express.Router(); 


publicRoutes.post('/stats', async (req, res) =>{
    var username = req.body.username;
    var platform = req.body.platform;
    var game = req.body.game; 
    var url = constants.COD_API_URL
    try{
    let response = await player.getPlayerStats(url, username, platform, game)
    res.send(response);
    }catch(error){
        console.error("error calling to get player stats", error); 
    }
})

publicRoutes.get('/friends', (req, res) =>{console.log("get player friends"); res.send("DONE")})

