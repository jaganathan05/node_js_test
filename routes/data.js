const path = require('path');

const express = require('express');

const dataController = require('../controller/data');

const router = express.Router();

router.get('/Home',dataController.home);
router.get('/tables',dataController.Tables);
router.post('/table',dataController.PostTable);

router.get('/table/:tableName',dataController.getTable);

router.post('/add',dataController.addValue)

module.exports=router;