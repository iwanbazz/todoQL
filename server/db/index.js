const pgp = require("pg-promise")();

const connect = {
  host: "postgres",
  database: "postgres",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  max: 30,
};
const db = pgp(connect);

const todoTable = "todo";

const handleError = (error) => {
  Console.error(error);
  pgp.end();
  return {};
};

db.none(
  `CREATE TABLE IF NOT EXISTS ${todoTable}(id BIGSERIAL PRIMARY KEY, data JSONB)`
).catch(handleError);

const fetchAll = () =>
  db
    .any(
      `SELECT
        id,
        data->'completed' AS completed,
        data->'action' AS action
      FROM ${todoTable} ORDER BY id`
    )
    .catch(handleError);

const fetchAllTodos = () => fetchAll();

const createTodo = (args) =>
  db.one(`INSERT INTO ${todoTable} (data) VALUES ($1) RETURNING id`, [
    { completed: false, action: args.action },
  ]);

const updateTodo = (args) =>
  db.none(`UPDATE ${todoTable} SET data = data || ($1) WHERE id=($2)`, [
    { action: args.action },
    args.id,
  ]);

const updateTodoCompleted = (args) =>
  db.none(`UPDATE ${todoTable} SET data = data || ($1) WHERE id=($2)`, [
    { completed: args.completed },
    args.id,
  ]);

const deleteTodo = (args) =>
  db.none(`DELETE FROM ${todoTable} WHERE id=($1)`, [args.id]);

module.exports = {
  fetchAllTodos,
  createTodo,
  updateTodo,
  updateTodoCompleted,
  deleteTodo,
};
