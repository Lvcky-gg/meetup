const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];
router.post(
    '/',
    // validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
 
      const user = await User.login({ credential, password });

            
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Invalid credentials';
        err.errors = ['The provided credentials were invalid.'];
        return res.json({
          "message":err.title,
          "statusCode":err.status
        })
      }
      

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Invalid credentials';
        err.errors = ['The provided credentials were invalid.'];
        return res.json({
          "message":err.title,
          "statusCode":err.status
        })
      }
     
      const { id, firstName, lastName, email } = user.dataValues;
      const token = await setTokenCookie(res, user)
      


      if(!credential || !password) {
        const err = new Error('Login Failed');
        err.status = 400;
        err.title = 'Validation error';
        err.errors = [];
        if(!credential)err.errors.push("Email is required");
        if(!password)err.errors.push("Password is required");
       
        return res.json({
          "message":err.title,
          "statusCode":err.status,
          "errors":err.errors
        })
      }
  
     
  
      await setTokenCookie(res, user);
  
      return res.json({
        id,
        firstName,
        lastName,
        email,
        token
      });
    }
  );

  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;