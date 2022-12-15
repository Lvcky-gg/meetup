const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleValidationForSignup } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid first name.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
      handleValidationForSignup
  ];

router.post(
    '/',
    validateSignup,
    async (req, res) => {
      try{
        
      const { firstName, lastName, email, password, username } = req.body;
      const user = await User.signup({firstName, lastName, email, username, password });
      await setTokenCookie(res, user);
      const { token } = req.cookies;
      

      return res.json({
          firstName,
          lastName,
          email,
          password,
          username,
          token
      });
    }catch(e){
      const errors = []
      const array = e.errors;
      for(let i = 0; i < array.length; i++)errors.push(array[i].message)
      res.status = 403;
    
      res.json({
        "message": "User already exists",
        "statusCode": 403,
      errors
      })
    }
    }
  );

  router.get(
    '/',
    async ( req, res) => {
      if(req.user){
        const { id, firstName, lastName, email } = req.user.dataValues;
        const { token } = req.cookies
        
        res.json({
          id,
          firstName,
          lastName,
          email,
          token
        })
      }else {
        res.status(200);
        res.json(
        {
          "user": null
        }
        )
      }
      
    }


  )
 
  

module.exports = router;