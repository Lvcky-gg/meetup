const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const group = require('../../db/models/group');



router.get('/',
async (req, res) => {
    // console.log(await Group.findByPk(1))
     const groups = await Group.findAll({
        include:{model:GroupImage}
     });

    //  const numMembers = User.findAll({
    //     where:{}
    //  })
    // let imgUrl;
    //  for (let i = 0; i < groups.length; i++){
    //     imgUrl = groups[i].dataValues.GroupImages[0].dataValues.url;
    //     console.log(imgUrl)
    //  }
    res.json(groups)

})

router.post('/:groupId/members',
async (req, res) => {
    // console.log(req.user)
    if(req.user){
        const { groupId } = req.params;
        const groupAssociated = await Group.findByPk(groupId,{
            include:{model:Membership}
        });
    
        if(groupAssociated){
            // console.log(groupAssociated.Memberships)

            for(let i = 0; i < groupAssociated.Memberships.length; i++){
               
               if((groupAssociated.Memberships[i].dataValues.memberId === req.user.dataValues.id) && (groupAssociated.Memberships[i].dataValues.groupId === parseInt(groupId)) ){
                if(groupAssociated.Memberships[i].dataValues.status === "pending"){
                    res.status = 400;
                    res.json( {
                        "message": "Membership has already been requested",
                        "statusCode": 400
                      })
                }else if(groupAssociated.Memberships[i].dataValues.status === "accepted"){
                    res.status = 400;
                    res.json( {
                        "message": "User is already a member of the group",
                        "statusCode": 400
                      })

                }
               }
            }
            

            const member = await Membership.create({
                groupId,
                memberId:req.user.dataValues.id,
                status:"pending"
            })

            res.json({
                groupId,
                "memberId":member.memberId,
                "status":member.status
            })
        }else{
            res.status = 404;
            res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              });
        }
        

    }else{
        res.status = 403;
        res.json({
            "message":"Unauthorized",
            "statusCode":403
        })
    }
})

router.post('/:groupId/photos',
async (req, res) => {
    if(req.user){
    
        const { groupId } = req.params;

        const { url, preview } = req.body;

        const groupAssociated = await Group.findByPk(groupId)
    if(groupAssociated){
        console.log(groupAssociated.dataValues)
        if(req.user.dataValues.id === groupAssociated.dataValues.organizerId ){
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

router.put('/:groupId',
async (req, res) => {
    const { groupId } = req.params;

    if(req.user){
        const groupAssociated = await Group.findByPk(groupId);
        if(groupAssociated){
            
            if(req.user.dataValues.id === groupAssociated.dataValues.organizerId ){

                
                const { name, about, type, private, city, state } = req.body;
            
                await groupAssociated.update({
                    name,
                    about,
                    type,
                    private,
                    city,
                    state
                })

                res.json(groupAssociated)

            }else{
                res.status = 403;
                res.json({
                    "message":"Unauthorized",
                    "statusCode":403
                })
            }
            
        }else{

            res.status = 404;
            res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
             })
        }

    };
});

router.delete('/:groupId/photos/:photoId',
async (req, res) => {
if(req.user){
    const { groupId, photoId } = req.params;
    const groupAssociated = await Group.findByPk(groupId,{
        include:{model:GroupImage}
    });
    console.log(req.user.dataValues.id)

    if (req.user.dataValues.id === groupAssociated.dataValues.organizerId){
        
        for(let i = 0; i < groupAssociated.GroupImages.length; i++){
            const groupImage = groupAssociated.GroupImages[i];
            console.log(groupImage.dataValues.id)
        
            if(groupImage.dataValues.id === parseInt(photoId)){
                groupImage.destroy();
                res.status = 200;
                res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                  });
            }

        }
        res.status = 404
        res.json({
            "message":"Photo is not present"
        });
    }else{
        res.status = 403
        res.json({
            "message":"Must be group organizer to delete image"
        })
    }

    res.json()
}else{
    res.status = 403;
    res.json({"message":"User must be logged in to use this feature"})
}
});

router.delete('/:groupId',
async (req, res) => {

    const { groupId } = req.params;
    if(req.user){

        const groupAssociated = await Group.findByPk(groupId);
        if(groupAssociated){
            
        if(req.user.dataValues.id === groupAssociated.dataValues.organizerId ){
            
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