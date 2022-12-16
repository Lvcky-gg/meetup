const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/',
async (req, res) => {
    console.log(await Group.findByPk(1))
    // const groups = await Group.findAll();

    res.json()

})

router.post('/',
async (req, res) => {
    if(req.user){
        
        const {name, about, type, private, city, state} = req.body;
        const organizerId = req.user.dataValues.id;
        const group = await Group.create({
            name,
            about,
            type,
            private,
            city,
            state,
            organizerId
        })
        
        res.json(group)
    }
    res.json()
})



module.exports = router;