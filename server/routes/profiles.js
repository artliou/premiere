'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
;

router.route('/vod')
  .post(ProfileController.setUpVOD)
  // .delete(ProfileController.deleteOne)
;

router.route('/follows')
  .post(ProfileController.setUpFollows)
  // .delete(ProfileController.deleteOne)
;


module.exports = router;
