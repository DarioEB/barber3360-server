const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post(
    '/',
    serviceController.createService
);

router.get(
    '/',
    serviceController.getServices
);

router.get(
    '/:id',
    serviceController.getService
)

router.get(
    '/edit/:id', 
    serviceController.getServiceEdit
)

router.put(
    '/:id',
    serviceController.updateService
)

router.delete(
    '/:id',
    serviceController.deleteService
)

module.exports = router;