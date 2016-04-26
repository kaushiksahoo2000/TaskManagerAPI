module.exports = {
  database: "taskManager",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "taskManager.sqlite",
    define: {
      underscored: true
    }
  },
  jwtSecret: "tasktedsfewf",
  jwtSession: {session: false}
};
