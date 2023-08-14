const router = require('express').Router();
const apiRoutes = require('./api-routes');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

//Here, we bundle these routers, to be imported by "server.js".
module.exports = router;