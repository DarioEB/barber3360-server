const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');

router.get(
    '/',
    timeController.getAllTimes
);

router.get(
    '/:date',
    timeController.getTimes
);

router.post(
    '/',
    timeController.createTime
);

router.put(
    '/:id',
    timeController.updateTime
);

router.delete(
    '/:id',
    timeController.deleteTime
);

module.exports = router;