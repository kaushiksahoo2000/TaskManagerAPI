module.exports = app => {
  const Tasks = app.db.models.Tasks;
  app.route("/tasks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      // "/tasks": List tasks
      Tasks.findAll({
        where: {user_id: req.user.id}
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        })
    })
    .post((req, res) => {
      // "/tasks": Save new task
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });
  app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      // "/tasks/1": Find a
      Tasks.findOne({where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => {
          if(result){
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    })
    .put((req, res) => {
      // "/tasks/1": Update
      Tasks.update(req.body, {where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    })
    .delete((req, res) => {
      // "/tasks/1": Delete
      Tasks.destroy({where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    });
};
