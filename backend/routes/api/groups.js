const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Attendee, EventImage, Event } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const group = require('../../db/models/group');

router.get('/:groupId/venues',
async (req, res)=>{
    const { groupId } = req.params;
    const currGroup = await Group.findByPk(groupId, {include:{model:Venue}});
    if(!currGroup){
        res.status = 403;
        return res.json( {
            "message": "Group couldn't be found",
            "statusCode": 404
          })
    }
    const result = []
    for(let i = 0; i < currGroup.Venues.length; i++){
  
        result.push({
            id:currGroup.Venues[i].dataValues.id,
            groupId,
            address:currGroup.Venues[i].dataValues.address,
            city:currGroup.Venues[i].dataValues.city,
            state:currGroup.Venues[i].dataValues.state,
            lat:currGroup.Venues[i].dataValues.lat,
            lng:currGroup.Venues[i].dataValues.lng
        })
    }
    return res.json(result)

});

router.get('/:groupId/events',
async (req, res) =>{
    const { groupId } = req.params;
    const result = [];
    const currGroup = await Group.findByPk(groupId)
  if(currGroup){ 
    const events = await Event.findAll({include:[{model:Group},{model:Venue}, {model:Attendee}, {model:EventImage}], where:{groupId}})
    for(let i = 0; i < events.length; i++){

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
    
    return res.json(result)
}else{
    res.status = 404;
    res.json( {
        "message": "Group couldn't be found",
        "statusCode": 404
      })
}
});


router.get('/:groupId/members',
async (req, res) => {
    const { groupId } = req.params;

   const result = []
    const members = await Membership.findAll({
        where:{ groupId }, include:{model:User}
    })

    const currentGroup = await Group.findByPk(groupId)
if(currentGroup){
    for(let i = 0; i < members.length; i++){
        
        if((members[i].dataValues.status === 'co-host') || (req.user.dataValues.id === currentGroup.organizerId)){
            if(req.user.dataValues.id === members[i].dataValues.memberId){
                 res.status = 200;
                 let  id = members[i].dataValues.User.dataValues.id;
                 let firstName = members[i].dataValues.User.dataValues.firstName;
                 let lastName = members[i].dataValues.User.dataValues.lastName;
                 let status = members[i].dataValues.status;
                 result.push({
                    id,
                    firstName,
                    lastName,
                    status
                })
                
            }
        }
        if(members[i].dataValues.status !== "pending" ){
           let  id = members[i].dataValues.User.dataValues.id;
            let firstName = members[i].dataValues.User.dataValues.firstName;
            let lastName = members[i].dataValues.User.dataValues.lastName;
            let status = members[i].dataValues.status;
            result.push({
                id,
                firstName,
                lastName,
                status
            })
        }
    }
       
    
        res.json(result)
    
}else{
    res.status = 404;
    res.json({
        "message": "Group couldn't be found",
        "statusCode": 404
      })
}

});

router.get('/current', 
async (req, res) =>{
    if(req.user){
        const result = []
        const currUser = req.user.dataValues.id;
        // const groups = await Membership.findAll()
        const groups = await Group.findAll({
            include:[{model:Membership}],
        });

        const images = await Group.findAll({
            include:{model:GroupImage}
       });

       for(let i = 0; i < groups.length; i++){
        const memberships = groups[i].Memberships;
        
        for(let k = 0; k < memberships.length; k++){
        
            if((memberships[k].dataValues.memberId === currUser)){
                let groupId = groups[i].dataValues.id;
                 let type = groups[i].dataValues.type;
                 let organizerId = groups[i].dataValues.organizerId;
                 let name = groups[i].dataValues.name;
                  let private = groups[i].dataValues.private;
                 let city = groups[i].dataValues.city;
                 let state = groups[i].dataValues.state;
                 let about = groups[i].dataValues.about;
                 let createdAt = groups[i].dataValues.createdAt;
                 let updatedAt = groups[i].dataValues.updatedAt;
                 let id = groups[i].dataValues.id;
                 let previewImage;
                 let numMembers = await Membership.count({
                where:{groupId}
             });
              if(images[i].dataValues.GroupImages[0]){
                  previewImage = images[i].dataValues.GroupImages[0].dataValues.url;
                 }
        
        result.push({
            id,
            organizerId,
            name,
            about,
            type,
            private,
            city,
            state,
            createdAt,
            updatedAt,
            numMembers,
            previewImage
        })

            }
        }

       }



        res.json(result);
    }else{
        res.status = 403;
        res.json({"message":"unauthorized"})
    }
})

router.get('/:groupId',
async (req, res) => {
    const {groupId} = req.params

 
 const numMembers = await Membership.count({where:{ groupId }});
 const currentGroup = await Group.findByPk(groupId, {
    include:{model:GroupImage}
 });
 if(currentGroup){
 const organizer = await User.findByPk(currentGroup.organizerId);
 const venues = await Venue.findAll({
    where:{groupId}
 })

 res.json({
    id:currentGroup.id,
    organizerId:currentGroup.organizerId,
    name:currentGroup.name,
    about:currentGroup.about,
    type:currentGroup.type,
    private:currentGroup.private,
    city:currentGroup.city,
    state:currentGroup.state,
    createdAt:currentGroup.createdAt,
    updatedAt:currentGroup.updatedAt,
    GroupImages:currentGroup.GroupImages,
    Organizer:organizer,
    Venues:venues
 })
}else{
    res.status = 404;
    res.json( {
        "message": "Group couldn't be found",
        "statusCode": 404
      })
}
})

router.get('/',
async (req, res) => {

     const groups = await Group.findAll({
        include:{model:GroupImage}
     });

     const response  = [];
     for(let i = 0; i < groups.length; i++){
       let groupId = groups[i].dataValues.id;
       let type = groups[i].dataValues.id;
       let organizerId = groups[i].dataValues.organizerId;
       let name = groups[i].dataValues.name;
       let private = groups[i].dataValues.private;
       let city = groups[i].dataValues.city;
       let state = groups[i].dataValues.state;
       let about = groups[i].dataValues.about;
       let createdAt = groups[i].dataValues.createdAt;
       let updatedAt = groups[i].dataValues.updatedAt;
       let id = groups[i].dataValues.id;
       let previewImage;
       let numMembers = await Membership.count({
            where:{groupId}
         });
        if(groups[i].dataValues.GroupImages[0]){
         previewImage = groups[i].dataValues.GroupImages[0].dataValues.url;
        }
        
        response.push({
            id,
            organizerId,
            name,
            about,
            type,
            private,
            city,
            state,
            createdAt,
            updatedAt,
            numMembers,
            previewImage
        })
     }
   
    res.json(response)

})

router.post('/:groupId/venues',
async (req, res) =>{
if(req.user){
    const { groupId } = req.params;
    const currGroup = await Group.findByPk(parseInt(groupId), {include:{model:Membership}});
    const { address, city, state, lat, lng } = req.body;
    if(!currGroup){
        res.status = 404;
        return res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
        })
    }
    if(req.user.dataValues.id === currGroup.dataValues.organizerId){
        const venue = await Venue.create({
            groupId,
            address,
            city,
            state,
            lat,
            lng
        })
        return res.json({
            id:venue.dataValues.id,
            groupId,
            address,
            city,
            state,
            lat, 
            lng
        })
    }
    for(let i = 0; i < currGroup.Memberships.length; i++){
        
        
        if(req.user.dataValues.id === currGroup.Memberships[i].memberId){
        
            if(((currGroup.Memberships[i].status === "host")||(currGroup.Memberships[i].status === "co-host"))){
                const venue = await Venue.create({
                    groupId,
                    address,
                    city,
                    state,
                    lat,
                    lng
                })
                return res.json({
                    id:venue.dataValues.id,
                    groupId,
                    address,
                    city,
                    state,
                    lat, 
                    lng
                })
                
            }
        }
    }
    res.status = 403
    return res.json({
        "message":"must be host or cohost to create venue",
        "status":403
    })
}else{
    res.status = 403;
   return res.json({
        "status":403,
        "message":"Must be logged in"
    })
}
})
router.post('/:groupId/events',
async (req, res) =>{
    if(req.user){
        const { groupId } = req.params;
        const { venueId, name, type, capacity, price, description, startDate, endDate} = req.body;
        const currentGroup =await Group.findByPk(groupId, {include:{model:Membership}});
        if(currentGroup){
        
        for(let i = 0 ; i < currentGroup.Memberships.length; i++){
            
            if(currentGroup.Memberships[i].dataValues.memberId === req.user.dataValues.id){
                if((currentGroup.Memberships[i].dataValues.status === "host")||(currentGroup.Memberships[i].dataValues.status === "co-host")){
                    const event = await Event.create({
                        venueId,groupId, name, type, capacity, price, description, startDate, endDate
                    })
                    const attendance = await Attendee.create({
                        status:"host",
                        eventId:event.dataValues.id,
                        groupId:currentGroup.dataValues.id,
                        userId:req.user.dataValues.id
                    })
                    return res.json({
                        id:event.id,
                        groupId:event.groupId,
                        name:event.name,
                        type:event.type,
                        capacity:event.capacity,
                        description:event.description,
                        startDate:event.startDate,
                        endDate:event.endDate
                    })
                }

            }
        }
    }else{
        res.status = 404;
        res.json({
            "message": "Group couldn't be found",
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

router.post('/:groupId/membership',
async (req, res) => {

    if(req.user){
        const { groupId } = req.params;
        const groupAssociated = await Group.findByPk(groupId,{
            include:{model:Membership}
        });
    
        if(groupAssociated){


            for(let i = 0; i < groupAssociated.Memberships.length; i++){
               
               if((groupAssociated.Memberships[i].dataValues.memberId === req.user.dataValues.id) && (groupAssociated.Memberships[i].dataValues.groupId === parseInt(groupId)) ){
            
                if(groupAssociated.Memberships[i].dataValues.status === "pending"){
                    
                    res.status = 400;
                   return res.json( {
                        "message": "Membership has already been requested",
                        "statusCode": 400
                      })
                }else if(groupAssociated.Memberships[i].dataValues.status === "accepted"){
                    res.status = 400;
                    return res.json( {
                        "message": "User is already a member of the group",
                        "statusCode": 400
                      })

                }else if((groupAssociated.Memberships[i].dataValues.status === "member")||(groupAssociated.Memberships[i].dataValues.status === "host")||(groupAssociated.Memberships[i].dataValues.status === "co-host")){
                    res.status = 400;
                    return res.json( {
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

            return res.json({
                groupId,
                "memberId":member.memberId,
                "status":member.status
            })
        }else{
            res.status = 404;
           return res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              });
        }
        

    }else{
        res.status = 403;
        return res.json({
            "message":"Unauthorized",
            "statusCode":403
        })
    }
})

router.post('/:groupId/images',
async (req, res) => {
    if(req.user){
    
        const { groupId } = req.params;

        const { url, preview } = req.body;

        const groupAssociated = await Group.findByPk(groupId, {include:{model:Membership}})
    if(groupAssociated){
        if((req.user.dataValues.id === groupAssociated.dataValues.organizerId)){
            const photo = await GroupImage.create({
                url, 
                preview,
                groupId
            })
    
            return res.json({
                id:photo.id,
                url,
                preview
            });
        }
       
        for(let i = 0; i < groupAssociated.Memberships.length; i++){
            // console.log(groupAssociated.Memberships[i].dataValues.memberId)
        if(req.user.dataValues.id === groupAssociated.Memberships[i].dataValues.memberId){
            const photo = await GroupImage.create({
                url, 
                preview,
                groupId
            })
    
            return res.json({
                id:photo.id,
                url,
                preview
            });
        }
    }
    res.status = 403
    return res.json({
        "message":"Must be member of group to add photo",
        "status":403
    })
    }else{
        res.status= 404;
        return res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          })
    }
       
    }else{
        res.status = 403
        res.json({"message":"unauthorized"})
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
        });

        const membership = await Membership.create({
            status:"host",
            groupId:group.dataValues.id,
            memberId:req.user.dataValues.id
        })
        
        res.json(group)
    }
    res.json()
});
//START HERE NEXT EDIT A MEMBERSHIP
router.put('/:groupId/membership',
async (req, res) => {
    if(req.user){
        const { groupId} = req.params;
        const { status, memberId } = req.body;
        if(status  === "pending"){
            res.status = 400;
            return res.json({
                "status":res.status,
                "message":"May not change status to pending"})
        }
        const group = await Group.findByPk(groupId,
            {
                include:{model:Membership}
            })
        const members = await Membership.findAll({where:{groupId}})
            if(group){
                
                
                for(let i = 0; i < group.dataValues.Memberships.length; i++){
                    console.log( members[i].memberId)
                   if(members[i].memberId) {
                    if(group.dataValues.organizerId === req.user.dataValues.id){
                        if(memberId === members[i].memberId){
                        members[i].update({ status })
                        return res.json({
                            "id":members[i].id,
                            "groupId":members[i].groupId,
                            "memberId":members[i].memberId,
                            "status":members[i].status
                        })
                     } 
                    }else if(memberId === members[i].memberId){
                        if((members[i].status === "co-host") || (members[i].status === "host")){
                            if(status === "co-host"){
                                res.status =  403
                                return res.json({
                                    "message":"must be organizer to change to co-host",
                                    "statusCode":res.status
                                })
                            }
                            members[i].update({ status })
                            return res.json({
                                "id":members[i].id,
                                "groupId":members[i].groupId,
                                "memberId":members[i].memberId,
                                "status":members[i].status
                            })
                        }
                    }else{
                        res.status = 403;
                        return res.json({
                            "message":"forbidden",
                            "statusCode":res.status
                        })
                    }
                   }
                }

             
                res.status = 404
                return res.json(  {
                    "message": "Membership between the user and the group does not exits",
                    "statusCode": 404
                  })
            }else{
                res.status = 404;
                return res.json({
                    "message": "Group couldn't be found",
                    "statusCode": 404
                  })
            }
        

    }else{
        res.status = 403;
        return res.json({"message":"unauthorized"})
    }
})



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

router.delete('/:groupId/membership',
async (req, res) => {
    if(req.user){
       
        const { groupId } = req.params;
        const { memberId } = req.body;
        const groupAssociated = await Group.findByPk(groupId,{
            include:{model:Membership}
        });
        if(!groupAssociated){
            res.status = 404
            return  res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              })
        }
        const membership =  await Membership.findAll({
            where:{ groupId }
        })
        //may need to remove groupId
        const member =  await Membership.findOne({where:{ memberId, groupId }});
        if(!member){
            res.status = 404
            return  res.json({
                "message": "Member couldn't be found",
                "statusCode": 404
              })
        }
        
        // Member couldn't be found
        if(groupAssociated){
            if(req.user.dataValues.id === groupAssociated.dataValues.organizerId){
                await member.destroy();
                        return res.json({
                            "message": "Successfully deleted membership from group"
                          })
            }
            
            for(let i = 0; i < membership.length; i++){
            
            if(req.user.dataValues.id === membership[i].dataValues.id ){
                
                    if((membership[i].dataValues.status === "host")||membership[i].dataValues.status === "co-host"){
                        // await membership[i].destroy();
                        return res.json({
                            "message": "Successfully deleted membership from group"
                          })
                        
                    }else if(membership[i].dataValues.memberId === req.user.dataValues.id){
                        await membership[i].destroy();
                       return res.json({
                            "message": "Successfully deleted membership from group"
                          })
                    }
            }
        }
                res.status = 404
                return  res.json({
                    "message": "must be host or cohost",
                    "statusCode": 404
                  })
            

        }else{
            res.status = 404
            return  res.json({
                "message": "Member couldn't be found",
                "statusCode": 404
              })
        }

        

    }else{
        res.status = 403;
        return  res.json({"message":"You must be logged in to complete this action"})
    }
})


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