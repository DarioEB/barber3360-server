const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const emailController = require('../controllers/emailController');
router.post(
    '/',
    shiftController.createShift,
    emailController.shiftVerificationEmail
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