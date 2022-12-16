const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');



router.get('/',
async (req, res) => {
    // console.log(await Group.findByPk(1))
     const groups = await Group.findAll({
        include:{model:GroupImage}
     });

    //  const numMembers = User.findAll({
    //     where:{}
    //  })
    let imgUrl;
     for (let i = 0; i < groups.length; i++){
        imgUrl = groups[i].dataValues.GroupImages[0].dataValues.url;
        console.log(imgUrl)
     }
    res.json(groups)

})

router.post('/:groupId/photos',
async (req, res) => {
    if(req.user){
    
        const { groupId } = req.params;

        const { url, preview } = req.body;

        const groupAssociated = await Group.findByPk(groupId)
    if(groupAssociated){
        if(req.user.dataValues.id === groupAssociated.dataValues.id ){
            const photo = await GroupImage.create({
                url, 
                preview,
                groupId
            })
    
            res.json({
                id:photo.id,
                url,
                preview
            });
        }
    }else{
        res.status= 404;
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          })
    }
       
    }
    
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
});

router.delete('/:groupId',
async (req, res) => {

    const { groupId } = req.params;
    if(req.user){

        const groupAssociated = await Group.findByPk(groupId);
        if(groupAssociated){
        if(req.user.dataValues.id === groupAssociated.dataValues.id ){
            
                groupAssociated.destroy();

                res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                  });
            
        }
    }else{
        res.status = 404;
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          })
    }
    }
})



module.exports = router;