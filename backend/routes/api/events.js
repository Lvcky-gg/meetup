const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Event, Attendee, EventImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const attendee = require('../../db/models/attendee');


router.get('/:eventId/attendees', 
async (req, res) =>{
    const { eventId } = req.params;
    const result = [];
    const currEvent = await Event.findByPk(eventId)
    if(currEvent){
        const attendees = await Attendee.findAll({include:[{model:User}], where:{eventId}});

        for(let i = 0; i < attendees.length; i++){
  
                let id = attendees[i].User.dataValues.id;
                let firstName = attendees[i].User.dataValues.firstName;
                let lastName = attendees[i].User.dataValues.lastName;
                let attendance = {
                    "status":attendees[i].dataValues.status

                }
              
                if(req.user.dataValues.id === attendees[i].dataValues.userId){
                    if((attendees[i].dataValues.status === "co-host")||(attendees[i].dataValues.status === "host")){
                       result.push({
                        id,
                        firstName,
                        lastName,
                        attendance
                       })
                    }
                }
                if(attendees[i].dataValues.status !== "pending"){
                    result.push({
                        id,
                        firstName,
                        lastName,
                        attendance
                       })
                
            }
        }
        res.json(result)
    }else{
        res.status = 404;
        res.json( {
            "message": "Event couldn't be found",
            "statusCode": 404
          })
    }
    
})

router.get('/', 
async (req, res) =>{

    
    const result = []
        const events = await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}]})
        for(let i = 0; i < events.length; i++){
            // console.log(events[0].dataValues)
            let id = events[i].dataValues.id;
            let groupId =events[i].dataValues.groupId;
            let venueId = events[i].dataValues.venueId;
            let name = events[i].dataValues.name;
            let type = events[i].dataValues.type;
            let startDate = events[i].dataValues.startDate;
            let endDate = events[i].dataValues.endDate;
            let numAttending = await Attendee.count({where:events[i].dataValues.id})
            let previewImage;
            if(events[i].EventImages[0])previewImage = events[i].EventImages[0].dataValues.url
            let group = {
                "id":events[i].dataValues.Group.dataValues.id,
                "name":events[i].dataValues.Group.dataValues.name,
                "city":events[i].dataValues.Group.dataValues.city,
                "State":events[i].dataValues.Group.dataValues.state
            };
            let venue = {
                "id":events[i].dataValues.Venue.dataValues.id,
                "city":events[i].dataValues.Venue.dataValues.city,
                "state":events[i].dataValues.Venue.dataValues.state
            }
            result.push({id, groupId, venueId, name, type, startDate, endDate, numAttending, previewImage, group, venue})
        }
        
        res.json(result)
   
});

router.delete('/:eventId/attendees/:attendeeId',
async (req, res) => {
if(req.user){
    const { eventId, attendeeId } = req.params;
    const currEvent = await Event.findByPk(eventId)
    
    if(currEvent){
       
    const currGroup = await Group.findByPk(currEvent.dataValues.groupId, {include:{model:Membership}})
    if(!currGroup){
        res.status = 404;
        return res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          })
    
    }
    const memberships = currGroup.Memberships;
    const userId = parseInt(attendeeId);
    const attendee = await Attendee.findOne({where:{eventId:currEvent.dataValues.id,userId  }})
    if(!attendee){
        res.status = 404;
        return res.json({
            "message": "Attendance does not exist for this User",
            "statusCode": 404
          })
    
    }
    
    for(let i = 0; i < memberships.length; i++){
        const member = memberships[i];
        
        if(req.user.dataValues.id === member.dataValues.memberId){
            if((member.dataValues.status === "host") ||(member.dataValues.status === "co-host")){
                await attendee.destroy()
                res.status = 200;
                return res.json({
                    "message": "Successfully deleted attendance from event"
                  })
                
                
            }

        }
    }
    res.status =403
    return res.json({
        "message": "Only the User or organizer may delete an Attendance",
        "statusCode": 403
      })
    }else{
        res.status = 404;
        return res.json({
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
})

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
router.put('/:eventId/attendees',
async (req, res) =>{
    if(req.user){
        const { eventId } = req.params;
        const event = await Event.findByPk(eventId, {include:{model:Group}})
        const { userId, status } = req.body;
        if(status === "pending"){
            res.status = 400;
            return res.json({
                "message": "Cannot change an attendance status to pending",
                "statusCode": 400
              })
        }
        
        const memberId = event.Group.dataValues.organizerId
        const  organizer = await Membership.findAll({where:{memberId, groupId:event.dataValues.groupId}})
        const attendee = await Attendee.findAll({where:{eventId}})
        if(!attendee){
            res.status = 404;
            res.json({
                "message": "Attendance between the user and the event does not exist",
                "statusCode": 404
              })
        }
        for(let i = 0; i < attendee.length; i++){
        if((organizer[i].dataValues.status === "cohost")||(organizer[i].dataValues.status === "accepted")){
            if(req.user.dataValues.id === organizer[i].dataValues.memberId){
                await attendee[i].update({
                    userId,
                    status
                })
                // console.log(userId)
                return res.json({
                    id:attendee[i].dataValues.id,
                    eventId:attendee[i].dataValues.eventId,
                    userId,
                    status
                })
                
            }
        }
     }
     res.status=403
        res.json({
            "status":403,
            "message":"must be host or co-host to change attendance to member"
        })

    }else{
        res.status = 404;
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          })
    }

});

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


router.post('/:eventId/photos',
async (req, res) =>{
    if(req.user){
        const { eventId } = req.params;
        const { url, preview } = req.body;
        const currEvent = await Event.findByPk(eventId, {include:{model:Attendee}});
        if(currEvent){

            for(let i = 0; i < currEvent.Attendees.length; i++){
               
                if(currEvent.Attendees[i].dataValues.userId === req.user.dataValues.id){

                    const photo = await EventImage.create({
                        url,
                        preview,
                        eventId
                    })
                    return res.json({
                        id:photo.id,
                        url,
                        preview
                    })
                }
            }
            res.status=403
            return res.json({
                "message":"Must be member of event to submit photo",
                "status":403
            })
        }else{
            res.status = 404;
            res.json({
                "message": "Event couldn't be found",
                "statusCode": 404
              })
        }

    
    }else{
        res.status = 403;
        res.json({
            "status":403,
            "message":"Unauthorized"
        })
    }

});

router.post('/:eventId/attendees', 
async (req, res) =>{

    if(req.user){
        const { eventId } = req.params;
        const eventAssociated = await Event.findByPk(eventId, {include:{model:Attendee}})
        const { userId, status} = req.body;

        if(eventAssociated){
            console.log(eventAssociated)

          for(let i = 0; i < eventAssociated.Attendees.length; i++ ){
            // console.log((eventAssociated.Attendees[i].dataValues.userId === req.user.dataValues.id))
            if( (eventAssociated.Attendees[i].dataValues.eventId === parseInt(eventId))){
                console.log(eventAssociated.Attendees[i])
                if(eventAssociated.Attendees[i].dataValues.status === "pending"){
                    res.status = 400;
                   return res.json({
                        "message": "Attendance has already been requested",
                        "statusCode": 400
                      })
                }else if(eventAssociated.Attendees[i].dataValues.status === "accepted"){
                    res.status = 400;
                   return res.json( {
                        "message": "User is already an attendee of the event",
                        "statusCode": 400
                      })
                }
                  
                
            }
          }
          const attendee = await Attendee.create({
            eventId,
            userId,
            status
        })
        return res.json({
            eventId:attendee.eventId,
            userId:attendee.userId,
            status:attendee.status
        })
        
        }else{
            res.status = 404;
            res.json({
                "message": "Event couldn't be found",
                "statusCode": 404
              })

        }

        res.json()

    }else{
        res.status = 403;
        res.json({
            "status":403,
            "message":"Unauthorized"
        })
    }
})

module.exports = router;