const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Attendee, EventImage, Event } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const group = require('../../db/models/group');

router.put('/:venueId', 
async (req, res) => {
    if(req.user){
        const { venueId } = req.params;
        const venue = await Venue.findByPk(venueId);
        if(!venue){
            res.status = 404;
            return res.json({
                "Message":"Venue could not be found",
                "status":404
            })
        }
        const { address, city, state, lat, lng } = req.body;
        const currGroup = await Group.findByPk(venue.dataValues.groupId, {include:{model:Membership}})
       
        if(currGroup.dataValues.organizerId === req.user.dataValues.id){
            const updated = await venue.update({
                address,
                city,
                state,
                lat,
                lng
            });
            return res.json({
                id:updated.id,
                groupId:venue.dataValues.groupId,
                address:updated.address,
                state:updated.state,
                lat:updated.lat,
                lng:updated.lng

            })
        }
        

        if(venue){
            const groupId= venue.dataValues.groupId
            const memberships = await Membership.findAll({where:{groupId}})

            for(let i = 0; i < memberships.length; i++){
                
                if(req.user.dataValues.id === memberships[i].dataValues.memberId){
                    if((memberships[i].dataValues.status === "host")||(memberships[i].dataValues.status === "co-host")){
                    
                        const updated = await venue.update({
                            address,
                            city,
                            state,
                            lat,
                            lng
                        });
                        return res.json({
                            id:updated.id,
                            groupId:venue.dataValues.groupId,
                            address:updated.address,
                            state:updated.state,
                            lat:updated.lat,
                            lng:updated.lng

                        })
                    }

                }
            }

            res.status = 403;
        return res.json({
            "message":"Must be host or co-host to make changes",
            "Status":403
        })
        }else{
            res.status = 404
            return res.json({
                "message": "Venue couldn't be found",
                "statusCode": 404
              })
        }
    }else{
        res.status = 403;
        res.json({
            "message":"Must be logged in",
            "status":403
        })
    }

});

module.exports = router;