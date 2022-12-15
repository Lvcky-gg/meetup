const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleValidationForSignup } = require('../../utils/validation');

//if req.user
router.post('/',
async(req, res)=>{
    if(req.user){
        console.log(req.user)
        res.json()
    }
    res.json()
})



module.exports = router;