import * as repository from '../db/repository';
import * as express from 'express'; 
import {PlayerParams,User} from '../utils/customTypes'; 
import * as validator from '../Managers/paramValidator'; 


export const userRoutes = express.Router(); 

/*
TODO: move COD services to another route or create a separate gamesAPI for calling game related API's
*/


// userRoutes.post('/cod/stats', async (req, res) =>{
//    var params : PlayerParams = {userName: req.body.userName, gameTitle: req.body.gameTitle, platform: req.body.platform  }
//    var paramErrors = validator.codStatsParamsValid(params);
//    if(paramErrors.length > 0){
//        res.status(404).send({status:"error", message:"missing or bad values for: " + paramErrors})
//    } else{
//         try{
//                 let response = await player.getPlayerStats(params)
//                     res.status(200).send(response);
//             }catch(error){
//                 console.error("error calling to get player stats", error); 
//                 res.status(500).send("error calling service with params: " + params); 
//             }
//         }
// })

// userRoutes.post('/cod/friends/stats', async (req, res) =>{
//     var params : PlayerParams = {userName: req.body.userName, gameTitle: req.body.gameTitle, platform: req.body.platform  }
//     var paramErrors = validator.codStatsParamsValid(params);
//     if(paramErrors.length > 0){
//         res.status(404).send({status:"error", message:"missing or malformed parameters: " + paramErrors})
//     } else{
//         try{
//             let response = await player.getPlayersFriendsStats(params)
//                 res.status(200).send(response);
//         }catch(error){
//             res.send(500).send("error while calling service with params:" + params); 
//             console.error("error calling to get player stats", error); 
//         }
//     }
//  })
 

 userRoutes.post('/user/get', (req, res) =>{
     if(req.body.userName){
    var params = req.body.userName
        repository.getUsersData(params)
                .then( (results) => {
                    res.status(200).send({status:'success', data: results});
                })
                .catch(err => { 
                    console.log("error getting data for user: " + params); 
                    console.error(err); 
                    res.status(500).send({status:"error", error: err}); 
                }) 
    }else {
        res.status(400).send({status:"error", message:"missing or malformed parameter: 'userEmail'"}); 
    }   
 })


 userRoutes.post('/user/add', (req, res) =>{
    var paramErrors = validator.addUserParamsValid(req.body);
    if(paramErrors.length > 0){
        res.status(404).send({status:"error", message:"missing or malformed parameters: " + paramErrors})
    } else{
        let useremail = req.body.userEmail.toLowerCase()
        let username= req.body.userName.toLowerCase()
        let firstname= req.body.firstName.toLowerCase()
        let lastname= req.body.lastName.toLowerCase()
       
        var userParams : User = {
            userEmail : useremail,  
            userName: username,
            displayName: req.body.userName,
            firstName: firstname, 
            lastName: lastname, 
            dateOfBirth: req.body.dateOfBirth,
            key: req.body.key,
            loginDate: new Date()
     }
        repository.insertUser(userParams)
                .then( (results) => {
                    if(results){
                        res.status(200).send({status:'success'});
                    }
                })
                .catch(err => { 
                    console.log("*** CATCH ERRORL: " + JSON.stringify(err)); 
                    let errMessage;
                    if(JSON.stringify(err).includes('already exists')){
                        errMessage = `user ${username} already exists`
                    }
                    console.error("error adding user: " + err); 
                    res.status(500).send({status:"Error", message: errMessage, error: err}); 
                }) 
    }
 })


 
