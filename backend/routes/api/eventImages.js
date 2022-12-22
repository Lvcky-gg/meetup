const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Event, Attendee, EventImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const attendee = require('../../db/models/attendee');

// router.delete('/:eventImageId',
// async (req, res)=>{
//     if(req.user){
//         const { eventImageId } = req.params;
//         const currEventImage = await EventImage.findByPk(eventImageId);
//         if(!currEvent){
//             res.status = 404;
//             return  res.json( {
//                   "message": "Event couldn't be found",
//                   "statusCode": 404
//                 })
//         }
//         const currPhoto = await EventImage.findByPk(photoId);
//         if(!currPhoto){
//             res.status = 404;
//           return  res.json( {
//                 "message": "Event Image couldn't be found",
//                 "statusCode": 404
//               })
//         }
//         const currGroup = await Group.findByPk(currEvent.dataValues.groupId, {include:{model:Membership}})
// // console.log(currGroup.Memberships.length)
//         for(let i = 0; i < currGroup.Memberships.length; i++){
//             // console.log(currGroup.Memberships[i])
//             if(currGroup.Memberships[i].memberId === req.user.id){
//                 if((currGroup.Memberships[i].status === "host")||(currGroup.Memberships[i].status === "co-host")){

//                     // currPhoto.destroy();
//                     res.status = 200;
//                     return res.json({
//                         "message": "Successfully deleted",
//                         "statusCode": 200
//                       })
//                 }
//             }
//         }
//         res.status = 403
//         return res.json({
//             "message":"must be host or co-host to delete image.",
//             "status":403
//         })

//     }else{
//         res.status = 403;
//         res.json({
//             "status":403,
//             "message":"Must be logged in"
//         })
//     }

// });

router.delete('/:eventImageId',
async (req, res) => {

    if(req.user){
        const { eventImageId } = req.params;

        res.json()
    }else{
        res.json()
    }

});


module.exports = router;