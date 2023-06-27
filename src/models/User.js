module.exports = {
  name: "User",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
    },
    fullName: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
    // relations: {
    //   todos: {
    //     target: "Todo",
    //     type: "one-to-many",
    //     joinTable: true,
    //     cascade: true,
    //   },
    // },
  },
};
