const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* in catch ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpVOD = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var subs = [];
      for (var key in req.body) {
        if (req.body[key]) {
          subs.push(req.body[key]);
        }
      }
      return profile.save({vod_subscriptions: JSON.stringify(subs)}, {patch: true});
    })
    .then(() => {
      console.log('********* in then success update for setUpVOD ');
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpVOD ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpVOD ', e);
      res.sendStatus(404);
    });
};

module.exports.setUpFollows = (req, res) => {
  models.Profile.where({ id: req.session.passport.user }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      var follows = [];
      // add all follow arrays - update below and save command
      for (var key in req.body) {
        if (req.body[key]) {
          follows.push(req.body[key]);
        }
      }
      return profile.save({vod_subscriptions: JSON.stringify(subs)}, {patch: true});
    })
    .then(() => {
      console.log('********* in then success update for setUpFollows ');
      res.sendStatus(201);
    })
    .error(err => {
      console.log('********* error in setUpFollows ', err);
      res.status(500).send(err);
    })
    .catch((e) => {
      console.log('********* catch in setUpFollows ', e);
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.session.passport.user }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
