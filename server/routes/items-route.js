// orch-app/server/routes/items-route.js

// Import express
const express = require('express');

// Import items-controller
const itemsRoutes = require('../controllers/items-controller.js');

// Create Router
const router = express.Router();

/* Add route for GET request to retrieve all members. The general route 
 * for members is '/members'. This is specified in server.js. Hence 
 * the route to display all members has to go to 'members/all'. This 
 * cannot be seen in the route below cause it will display  '/all'
 * only. This is handled in the same way for the other routes. */

router.get('/all', itemsRoutes.membersAll);

// Route to create a new member:
router.post('/create', itemsRoutes.memberCreate);

// Route to delete a specific member
router.put('/delete', itemsRoutes.memberDelete);

// Route to delete all members
router.put('/reset', itemsRoutes.membersClearAll);

/* ************************************************+ */
// Date routes

router.get('/datesall', itemsRoutes.datesAll);

// Route to create a new member:
router.post('/datecreate', itemsRoutes.dateCreate);

// Route to delete a specific member
router.put('/datedelete', itemsRoutes.dateDelete);

// Route to delete all members
router.put('/reset', itemsRoutes.datesClearAll);

module.exports = router;


