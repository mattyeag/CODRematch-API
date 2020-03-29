import * as express from 'express'; 
import {UserAuthObj, UserLoginInput,Player} from '../utils/customTypes'
import * as validator from '../Managers/paramValidator'
import * as playerManager from '../Managers/player-manager'

export const playerRoutes = express.Router(); 


playerRoutes.post('/create', (req,res) => {
    let playerParams = <Player> req.body;
    let paramErrors = validator.createPlayerValidate(playerParams);
    if(paramErrors.length > 0){
        res.status(500).send({status:'error', message:`missing or malformed parameters ${paramErrors.join(',')}`})
    }else{
        playerManager.createPlayer(playerParams).then((response: Array<Player>) =>{
            console.log("response in /create, body: " + response); 
            if(response){
                res.status(200).send({status:'success', data:response})
            }
        }).catch((error) => {
            console.log("error in service /create")
            res.status(500).send({status:'error', message:error})
        })
    }
})