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
            if(attendees[i]){
  
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
    }
        return res.json(result)
    
    }else{
        res.status = 404;
        res.json( {
            "message": "Event couldn't be found",
            "statusCode": 404
          })
    }
    
})

router.get('/:eventId', 
async (req, res)=>{
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId, {include:[{model:Group},{model:Venue}, {model:EventImage}]});
    if(!event){
        res.status = 404;
       return res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          })
    }
    const EventImages = []
    const numAttending = await Attendee.count({where:{eventId}})
    for(let i = 0; i < event.EventImages.length; i++){
        const eventData = event.EventImages[i].dataValues;
        EventImages.push({
            id:eventData.id,
            url:eventData.url,
            preview:eventData.preview
        })

    }
    let group;
    if(event.Group){
        group = {
                id:event.Group.dataValues.id,
                name:event.Group.dataValues.name,
                private:event.Group.dataValues.private,
                city:event.Group.dataValues.city,
                state:event.Group.dataValues.state
            }

        }
    
    let venue = {};
    if(event.Venue){
        
           
            venue ={
                id:event.Venue.dataValues.id,
                address:event.Venue.dataValues.address,
                city:event.Venue.dataValues.city,
                state:event.Venue.dataValues.state,
                lat:event.Venue.dataValues.lat,
                lng:event.Venue.dataValues.lng
            }
    }


   return res.json({
    id:event.dataValues.id,
    name:event.dataValues.name,
    description:event.dataValues.description,
    type:event.dataValues.type,
    capacity:event.dataValues.capacity,
    price:event.dataValues.price,
    startDate:event.dataValues.startDate,
    endDate:event.dataValues.endDate,
    numAttending,
    Group:group,
    Venue:venue,
    EventImages
   });

});

router.get('/', 
async (req, res) =>{
    let { page, size, name, type, startDate} = req.query;
    const errors = [];


    page = parseInt(page);
    size = parseInt(size);
    
    if(page && (page < 0)){
        errors.push("Page must be greater than or equal to 0")
    }
    if(size && (size < 0)){
        errors.push("Size must be greater than or equal to 0")
    }
    if(name && (parseInt(name))){
        errors.push("Name must be a string")
    }
    if(type && !((type.toLowerCase() === "online")||(type.toLowerCase() === "in person"))){
        errors.push("Type must be 'Online' or 'In Person'")
    }
    if(startDate){
            let date = new Date(startDate)

        if(date.toString() === "Invalid Date"){

            errors.push("Start date must be a valid datetime")
        }
    }


    if(errors.length > 0){
    res.status = 400;
    return res.json({
        "message": "Validation Error",
        "statusCode": 400,
        errors
    })
    }
    if(isNaN(page))page = 0;
    if(isNaN(size))size = 20;
    if(size > 20)size = 20;
    
    let events = await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1)});
    const result = []
       if(name){
       events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{name}});
       }
       if(type){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{type}});
       }
       if(startDate){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{startDate}});
       }
       if(name && type){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{name, type}});
       }
       if(name && startDate){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{name, startDate}});
       }
       if(startDate && type){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{type, startDate}});
       }
       if(name && startDate && type){
        events =await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}],limit:size,offSet:size * (page -1), where:{name, startDate, type}});
       }

        for(let i = 0; i < events.length; i++){
    
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
           let group = {};
           if(events[i].Group){
             group = {
                "id":events[i].dataValues.Group.dataValues.id,
                "name":events[i].dataValues.Group.dataValues.name,
                "city":events[i].dataValues.Group.dataValues.city,
                "State":events[i].dataValues.Group.dataValues.state
            };
        }
            let venue = {};
            if(events[i].Venue){
             venue = {
                "id":events[i].Venue.dataValues.id,
                "city":events[i].Venue.dataValues.city,
                "state":events[i].Venue.dataValues.state
            }
        }
            result.push({id, groupId, venueId, name, type, startDate, endDate, numAttending, previewImage, group, venue})
        }
        
        res.json({result, page, size})
   
});

router.delete('/:eventId/attendance',
async (req, res) => {
if(req.user){
    const { memberId } = req.body
    const { eventId } = req.params;
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
    
    
    const attendee = await Attendee.findOne({where:{eventId:currEvent.dataValues.id,userId:memberId   }})
    if(!attendee){
        res.status = 404;
        return res.json({
            "message": "Attendance does not exist for this User",
            "statusCode": 404
          })
    
    }
    if((currGroup.dataValues.organizerId === req.user.dataValues.id)||(req.user.dataValues.id ===memberId)){
        await attendee.destroy()
        res.status = 200;
        return res.json({
            "message": "Successfully deleted attendance from event"
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
       
        const event = await Event.findByPk(eventId, {include:[{model:Group}]});
        if(event){
            const organizer = event.Group.dataValues.organizerId;
            const memberships = await Group.findByPk(event.dataValues.groupId, {include:{model:Membership}});
            if(organizer === req.user.dataValues.id){
                event.destroy();
                        return res.json({
                            "message": "Successfully deleted"
                          })
            }
            for(let i = 0 ; i < memberships.Memberships.length; i++){
             
                if((memberships.Memberships[i].status === "co-host")|| (memberships.Memberships[i].status === "host")){
                    
                    if(req.user.dataValues.id === memberships.Memberships[i].memberId){
                        event.destroy();
                        return res.json({
                            "message": "Successfully deleted"
                          })
                    }
    
                }
    
            }
            return res.json({
                "message":"must be host or co-host"
            })
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
router.put('/:eventId/attendance',
async (req, res) =>{
    if(req.user){
        const { eventId } = req.params;
        const { status, userId } = req.body
        const event = await Event.findByPk(eventId, {include:{model:Group}})
      
       
        if(!event){
            res.status = 404;
            return res.json({
                "message": "Event couldn't be found",
                "statusCode": 404
              })
        }
        const memberId = event.Group.dataValues.organizerId
        
        const  organizer = await Membership.findAll({where:{memberId}})
        
        const attendee = await Attendee.findAll({where:{eventId}})


        if(status === "pending"){
            res.status = 400;
            return res.json({
                "message": "Cannot change an attendance status to pending",
                "statusCode": 400
              })
        }
       
       
        if(!attendee || !organizer){
            res.status = 404;
            res.json({
                "message": "Attendance between the user and the event does not exist",
                "statusCode": 404
              })
        }
        let val;
        if(organizer.length > attendee.length)val = organizer
        if(attendee.length > organizer.length)val = attendee
        for(let i = 0; i < val.length; i++){
            
        if(organizer[i] && attendee[i]){
            
        if((memberId === req.user.dataValues.id)||((organizer[i].dataValues.status === "cohost")||(organizer[i].dataValues.status === "host"))){   
            
            if(req.user.dataValues.id === attendee[i].dataValues.userId){

                await attendee[i].update({
                    userId,
                    status
                })
             
                return res.json({
                    id:attendee[i].dataValues.id,
                    eventId:attendee[i].dataValues.eventId,
                    userId,
                    status
                })
                
            }
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
            "message": "Must be logged in",
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
        const groupId = event.Group.dataValues.id;
        const organizer = event.Group.dataValues.organizerId;
        if(organizer === req.user.dataValues.id){
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
                if((memberships[i].dataValues.status === "host")||(memberships[i].dataValues.status === "co-host")){
               
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


router.post('/:eventId/images',
async (req, res) =>{
    if(req.user){
        const { eventId } = req.params;
        const { url, preview } = req.body;
        const currEvent = await Event.findByPk(eventId, {include:{model:Attendee}});
        if(!currEvent){
            res.status = 404;
            return res.json({
                "Message":"Event could not be found",
                "Status":404
            })
        }
        const currGroup = await Group.findByPk(currEvent.dataValues.groupId)
       
        if(currGroup.dataValues.id === req.user.dataValues.id){
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

router.post('/:eventId/attendance', 
async (req, res) =>{

    if(req.user){
        const { eventId } = req.params;
        const eventAssociated = await Event.findByPk(eventId, {include:{model:Attendee}})
        // const { userId, status} = req.body;

        if(eventAssociated){

          for(let i = 0; i < eventAssociated.Attendees.length; i++ ){
         
            if( (eventAssociated.Attendees[i].dataValues.eventId === parseInt(eventId))){
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
            userId:req.user.dataValues.id,
            status:"pending"
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