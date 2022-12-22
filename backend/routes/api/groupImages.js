const router = require('express').Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Group, GroupImage, Membership, Venue, Event, Attendee, EventImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const attendee = require('../../db/models/attendee');


// router.delete('/:groupimageId',
// async (req, res) => {
// if(req.user){
//     const { groupId, photoId } = req.params;
//     const groupAssociated = await Group.findByPk(groupId,{
//         include:[{model:GroupImage}, {model:Membership}]
//     });
//     const currPhoto = await GroupImage.findByPk(photoId)
//     if(!currPhoto){
//         res.status = 404;
//       return  res.json( {
//             "message": "Event Image couldn't be found",
//             "statusCode": 404
//           })
//     }

  
        
//         for(let i = 0; i < groupAssociated.Memberships.length; i++){
        
//             console.log(groupAssociated.Memberships[i].dataValues.memberId)
    
    
//             if(req.user.dataValues.id === groupAssociated.Memberships[i].dataValues.memberId){
//                 if((groupAssociated.Memberships[i].dataValues.status === "host")||(groupAssociated.Memberships[i].dataValues.status === "co-host")){
//                 groupImage.destroy();
//                 res.status = 200;
//                 return res.json({
//                     "message": "Successfully deleted",
//                     "statusCode": 200
//                   });
//                 }
//             }

//         }
//         res.status = 404
//        return res.json({
//             "message":"Must be host or co-host to delete image"
//         });
   
// }else{
//     res.status = 403;
//     res.json({"message":"User must be logged in to use this feature"})
// }
// });


module.exports = router;