import * as player from '../Managers/playerManager'
import * as express from 'express'; 
import {PlayerParams,User} from '../utils/customTypes'; 
import * as validator from '../Managers/paramValidator'; 


export const publicRoutes = express.Router(); 


publicRoutes.post('/cod/stats', async (req, res) =>{
   var params : PlayerParams = {userName: req.body.userName, gameTitle: req.body.gameTitle, platform: req.body.platform  }
   var paramErrors = validator.codStatsParamsValid(params);
   if(paramErrors.length > 0){
       res.status(404).send({status:"error", message:"missing or bad values for: " + paramErrors})
   } else{
        try{
                let response = await player.getPlayerStats(params)
                    res.status(200).send(response);
            }catch(error){
                console.error("error calling to get player stats", error); 
                res.status(500).send("error calling service with params: " + params); 
            }
        }
})

publicRoutes.post('/cod/friends/stats', async (req, res) =>{
    var params : PlayerParams = {userName: req.body.userName, gameTitle: req.body.gameTitle, platform: req.body.platform  }
    var paramErrors = validator.codStatsParamsValid(params);
    if(paramErrors.length > 0){
        res.status(404).send({status:"error", message:"missing or malformed parameters: " + paramErrors})
    } else{
        try{
            let response = await player.getPlayersFriendsStats(params)
                res.status(200).send(response);
        }catch(error){
            res.send(500).send("error while calling service with params:" + params); 
            console.error("error calling to get player stats", error); 
        }
    }
 })
 

 publicRoutes.post('/rematch/get/users', (req, res) =>{
     if(req.body.userEmail){
    var params = req.body.userEmail
        try{ 
        player.getUsersData(params)
                .then( (results) => {
                    res.status(200).send(results);
                })
                .catch(err => { 
                    console.log("error getting data for user: " + params); 
                    console.error(err); 
                    res.status(500).send({status:"Error", error: err}); 
                }) 
            }catch(error){
                console.error("error calling service for user: " + params);
                res.status(500).send("error calling service for user: " + params);
            }
    }else{
        res.status(400).send({status:"error", message:"missing or malformed parameter: 'userEmail'"}); 
    }   
 })


 publicRoutes.post('/rematch/add/user', (req, res) =>{
     var userParams : User = {
        userEmail : req.body.userEmail, 
        gamerTag: req.body.gamer_tag,
        platform: req.body.platform_cd,
        gameCode: req.body.game_cd,
        loginDate: new Date()
     }
     var paramErrors = validator.addUserParamsValid(userParams);
    if(paramErrors.length > 0){
        res.status(404).send({status:"error", message:"missing or malformed parameters: " + paramErrors})
    } else{
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
    }
 })


 
