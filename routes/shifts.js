const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');

router.post(
    '/',
    shiftController.createShift
);

router.get(
    '/:date',
    shiftController.getShiftsDate
)

router.put(
    '/:id',
    shiftController.updateShift
)
module.exports = router;