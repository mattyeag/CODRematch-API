import * as player from '../Managers/playerManager'
import * as express from 'express'; 
import {PlayerParams,User} from '../utils/customTypes'; 


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

publicRoutes.post('/cod/friends/stats', async (req, res) =>{
    var params : PlayerParams = {userName: req.body.username, gameTitle: req.body.game, platform: req.body.platform  }
     try{
 
         let response = await player.getPlayersFriendsStats(params)
         if(response.status == 'success'){
             res.send(response);
         }else{
             res.send({status:'error', message: `error calling player stats api. Response: ${JSON.stringify(response)}`}); 
         }
     }catch(error){
         console.error("error calling to get player stats", error); 
     }
 })
 

 publicRoutes.post('/rematch/get/users', (req, res) =>{
    var params = req.body.userEmail
        try{ 
        player.getUsersData(params)
                .then( (results) => {
                    res.send(results);
                })
                .catch(err => { 
                    console.log("error getting data for user: " + params); 
                    console.error(err); 
                    res.send({status:"Error", error: err}); 
                }) 
            }catch(error){
                console.error("error calling service for user:");
                console.dir(params); 
                res.sendStatus(500);
            }
        
 })


 publicRoutes.post('/rematch/add/user', (req, res) =>{
     var userParams : User = {
        email : req.body.email, 
        gamerTag: req.body.gamer_tag,
        platform: req.body.platform_cd,
        gameCode: req.body.game_cd,
        loginDate: new Date()
     }
    console.dir(userParams); 
        try{ 
        player.insertPlayer(userParams)
                .then( (results) => {
                    res.send(results);
                })
                .catch(err => { 
                    console.log("error getting data for user: " + userParams); 
                    console.error(err); 
                    res.send({status:"Error", error: err}); 
                }) 
            }catch(error){
                console.error("error calling service for user:");
                console.dir(userParams); 
                res.sendStatus(500);
            }
        
 })


 
