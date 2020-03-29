import * as express from 'express'; 
import {UserAuthObj, UserLoginInput} from '../utils/customTypes'
import * as validator from '../Managers/paramValidator'
import {getUserAuth, isPasswordValid} from '../Managers/auth-Manager'

export const authRoutes = express.Router(); 


authRoutes.post("/login", (req,res) => {
    let userParams = <UserLoginInput> req.body;
    var paramErrors = validator.loginParamasValidate(userParams);
        if(paramErrors.length > 0){
            res.status(404).send({status:"error", message:"missing or malformed parameters: " + paramErrors})
        } else{
            console.log("authenticating user. ")
            getUserAuth(userParams).then((userData: UserAuthObj) => {
                if(userData){
                    if(isPasswordValid(userData, userParams.password)){
                        res.status(200).send({status:"success", data:userData})
                    }else{
                        res.status(500).send({status:'error', message:'password invalid'})
                    }
                }else{
                    res.status(500).send({status:"error", message:`user ${userParams.username} not found`})
                }
            }).catch( (error) => {
                res.status(500).send({status:"error", message:error})
            })    
        }
})