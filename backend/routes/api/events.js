const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Event, Attendee, EventImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const attendee = require('../../db/models/attendee');

router.get('/', 
async (req, res) =>{

    
    const result = []
        const events = await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}]})
        for(let i = 0; i < events.length; i++){
            // console.log(events[0].dataValues)
            let id = events[0].dataValues.id;
            let groupId =events[0].dataValues.groupId;
            let venueId = events[0].dataValues.venueId;
            let name = events[0].dataValues.name;
            let type = events[0].dataValues.type;
            let startDate = events[0].dataValues.startDate;
            let endDate = events[0].dataValues.endDate;
            let numAttending = await Attendee.count({where:events[0].dataValues.id})
            let previewImage;
            if(events[0].EventImages[0])previewImage = events[0].EventImages[0].dataValues.url
            let group = {
                "id":events[0].dataValues.Group.dataValues.id,
                "name":events[0].dataValues.Group.dataValues.name,
                "city":events[0].dataValues.Group.dataValues.city,
                "State":events[0].dataValues.Group.dataValues.state
            };
            let venue = {
                "id":events[0].dataValues.Venue.dataValues.id,
                "city":events[0].dataValues.Venue.dataValues.city,
                "state":events[0].dataValues.Venue.dataValues.state
            }
            result.push({id, groupId, venueId, name, type, startDate, endDate, numAttending, previewImage, group, venue})
        }
        
        res.json(result)
   
});

router.delete('/:eventId',
async (req, res) => {
    if(req.user){
        const { eventId } = req.params;
        console.log(parseInt(eventId))
        const event = await Event.findByPk(eventId, {include:[{model:Group}]});
        if(event){
            const organizer = event.Group.dataValues.organizerId;
            const memberships = await Group.findByPk(event.dataValues.groupId, {include:{model:Membership}});
            // console.log(memberships.Memberships)
            for(let i = 0 ; i < memberships.Memberships.length; i++){
                console.log(memberships.Memberships[i].status)
                if((memberships.Memberships[i].status === "co-host")|| (memberships.Memberships[i].status === "host")){
                    
                    if(req.user.dataValues.id === memberships.Memberships[i].memberId){
                        event.destroy();
                        return res.json({
                            "message": "Successfully deleted"
                          })
                    }
    
                }
    
            }
            return res.json()
        }else{
            return res.json( {
                "message": "Event couldn't be found",
                "statusCode": 404
              })
        }
      
    }else{
        res.status = 403;
        res.json({
            "status":403,
            "message":"Must be logged in"
        })
    }
});
//issues
router.put('/:eventId', 
async (req, res)=>{
    if(req.user){

        const { eventId } = req.params;
        const event = await Event.findByPk(parseInt(eventId), {include:[{model:Group}]});
        const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

        if(event){
        const groupId = event.Group.dataValues.id
        const memberships = await Membership.findAll({where:{groupId}});
       
        const venue = await Venue.findByPk(venueId);
        
        
        if(!venue  && (venueId != null)){
            res.status = 404
           return res.json({
                "message": "Venue couldn't be found",
                "statusCode": 404
              })
            
        }
        for(let i = 0; i < memberships.length; i++){
            
            if(req.user.dataValues.id === memberships[i].dataValues.memberId){
                if((memberships[i].dataValues.status === "accepted")||(memberships[i].dataValues.status === "co-host")){
                    console.log(venueId)
                    event.update({
                        venueId,
                        // groupId,
                        name,
                        type,
                        capacity,
                        price,
                        description,
                        startDate,
                        endDate
                    })
                    return res.json({
                        id:event.id,
                        groupId:event.groupId,
                        venueId:event.venueId,
                        name:event.name,
                        type:event.type,
                        capacity:event.capacity,
                        price:event.price,
                        description:event.description,
                        startDate:event.startDate,
                        endDate:event.endDate
                    })
                    
                }
            }
            return res.json({
                "message":"Must be host or cohost to update"
            })
        }
        }else{
            res.status = 404;
            res.json({
                "message": "Event couldn't be found",
                "statusCode": 404
              })
            
        }
        

        // res.json()

    }else{
        res.status = 403;
        res.json({
            "status":403,
            "message":"Unauthorized"
        })
    }
})

module.exports = router;