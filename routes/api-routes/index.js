//In this file, we "require" "express" to interact with our database, as well as the "routes" as established in our "user-routes" and "thought-routes" files.
const router = require('express').Router();

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/user-routes', userRoutes);
router.use('/thought-routes', thoughtRoutes);

//Here, we bundle these routers, to be imported by "routes/index.js".
module.exports = router;