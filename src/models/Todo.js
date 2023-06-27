module.exports = {
  name: "Todo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "varchar",
    },
    userId: {
      type: "int",
    },
  },
};
