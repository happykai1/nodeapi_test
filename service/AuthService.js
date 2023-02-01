
//const { randomUUID } = require('crypto');
const jwtService = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const uuid = require('uuid');
const logger = require('../utils/Logger');
const formatDate = require('../utils/FormatDate');

const createJWT = (req, res, next) => {
    //Mock user
    // const user = {
    //     id:Date.now(),
    //     userEmail:'example@gmail.com',
    //     password:'123'
    // }
    // const uuid = randomUUID()
    // const uuid = uuidv4().replace(/-/g, '');
    const id = uuid.v1();
    const date = formatDate(new Date());
    console.log(date);
    const { user_email, password } = req.body;
    const user = {
        id:id,
        date:date,
        userEmail:user_email,
        password:password
    }
    logger.info(`Processing request : ${req.method} ${req.url}`);
    jwtService.sign({user},'secretkey',(err, token)=>{
        res.json({
            token
        })
    })
//send abpve as payload
}

const verifyToken = (req,res,next) => {
    //Auth header value = > send token into header

    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){

        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //next middleweare
        //next();
        jwt.verify(req.token,'secretkey',(err,authData)=>{
            if(err)
                res.sendStatus(403);
            else{
                res.json({
                    message:"Welcome to Profile",
                    // userData:authData
                    authData
                })

            }
        })

    }else{
        //Fobidden
        res.sendStatus(403);
    }

}
module.exports = {
    createJWT, verifyToken
}
