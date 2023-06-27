const { DataSource, EntitySchema } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123123",
  database: "todo_app",
  synchronize: true,
  logging: true,
  entities: [
    new EntitySchema(require("./User")),
    new EntitySchema(require("./Todo")),
  ],
  subscribers: [],
  migrations: [],
});

module.exports = {
  AppDataSource,
};
