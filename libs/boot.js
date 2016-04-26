module.exports = app => {
  app.db.sequelize.sync().done(() => {
    app.listen(app.get("port"), () => {
      console.log(`taskManager API - Port ${app.get("port")}`);
    });
  });
};
