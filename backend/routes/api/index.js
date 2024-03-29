const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupRouter = require('./groups.js');
const eventRouter = require('./events.js');
const venueRouter = require('./venues');
const groupImagesRouter = require('./groupImages');
const eventImagesRouter = require('./eventImages')
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
// const { requireAuth } = require('../../utils/auth.js');
router.use(restoreUser);

// router.get('/login', )
router.use('/event-images', eventImagesRouter);
router.use('/group-images', groupImagesRouter);
router.use('/groups', groupRouter);
router.use('/events', eventRouter);
router.use('/venues', venueRouter);



router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});




// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });


  

module.exports = router;